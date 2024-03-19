const tahun = new Date('YYYY');

function get_perkara($nomor_perkara){
    $tahun = $this->session->userdata('tahun_monitor');
    return $this->db->query("SELECT nomor_perkara,
                                    para_pihak,
                                    perkara_id,
                                    jenis_perkara_nama,
                                    tanggal_pendaftaran,
                                      (CASE WHEN tahapan_terakhir_id < 20 THEN 'Tingkat Pertama'
                                           WHEN tahapan_terakhir_id < 30 THEN 'Banding'
                                           WHEN tahapan_terakhir_id < 40 THEN 'Kasasi'
                                           WHEN tahapan_terakhir_id < 50 THEN 'PK'
                                           WHEN tahapan_terakhir_id < 60 THEN 'Eksekusi'
                                      END) AS tahapan,
                                      proses_terakhir_text
                               FROM perkara
                               WHERE nomor_perkara = '".$nomor_perkara."'
                               ;");

}