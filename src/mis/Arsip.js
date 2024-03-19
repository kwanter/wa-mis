const tahun = new Date('YYYY');

function belum_diarsipkan(){
    const query = $this->db->query("SELECT A.nomor_perkara,
                                      A.para_pihak,
                                      A.jenis_perkara_nama,
                                      CASE WHEN A.tahapan_terakhir_id < 20 THEN 'Tingkat Pertama'
                                           WHEN A.tahapan_terakhir_id < 30 THEN 'Banding'
                                           WHEN A.tahapan_terakhir_id < 40 THEN 'Kasasi'
                                           WHEN A.tahapan_terakhir_id < 50 THEN 'PK'
                                           WHEN A.tahapan_terakhir_id < 60 THEN 'Eksekusi'
                                      END AS tahapan,
                                      A.proses_terakhir_text, 
                                      B.tanggal_bht
                               FROM perkara AS A
                                    LEFT JOIN perkara_putusan AS B ON B.perkara_id=A.perkara_id
                                    LEFT JOIN perkara_pk AS C ON C.perkara_id=A.perkara_id
                               WHERE B.tanggal_bht IS NOT NULL
                                     AND A.alur_perkara_id <>'114'
                                     AND YEAR(B.tanggal_bht) = $tahun
                                     AND A.perkara_id NOT IN (SELECT perkara_id FROM arsip WHERE perkara_id <>'0')
                                     AND C.permohonan_pk IS NULL
                               ORDER BY B.tanggal_bht DESC");
    return $query;
}

function arsip_valid(){
    $query = $this->db->query("SELECT perkara_id, 
                                    nomor_perkara, 
                                    tanggal_masuk_arsip, 
                                    no_lemari, 
                                    no_rak, 
                                    no_berkas
                                    FROM arsip 
                                    WHERE perkara_id ='0'
                                    AND nomor_perkara NOT IN (SELECT nomor_perkara FROM perkara)
                                    AND nomor_perkara NOT LIKE '%eks%'
                                    AND YEAR(tanggal_masuk_arsip) = $tahun
                                    ORDER BY tanggal_masuk_arsip DESC");
    return $query;
}	