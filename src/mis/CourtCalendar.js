const tahun = new Date('YYYY');

function belum_isi_court_calendar(){
    $query = $this->db->query("SELECT 					
                A.tanggal_pendaftaran, 
                A.nomor_perkara, 
                A.proses_terakhir_text,
                A.para_pihak, 
                C.agenda,
                D.panitera_nama,
                (SELECT GROUP_CONCAT(DISTINCT hkpn.nama_gelar ORDER BY hk.id ASC SEPARATOR '<br>') AS nama_hakim 
                FROM perkara_hakim_pn AS hk
                LEFT JOIN hakim_pn AS hkpn ON hkpn.id = hk.hakim_id
                WHERE hk.perkara_id= A.perkara_id AND hk.aktif='Y' ORDER BY hk.urutan ASC) AS majelis_hakim
                            FROM perkara as A
                            LEFT JOIN perkara_hakim_pn as B ON B.perkara_id=A.perkara_id
                            LEFT JOIN perkara_jadwal_sidang as C ON C.perkara_id=A.perkara_id
                            LEFT JOIN perkara_panitera_pn as D ON D.perkara_id=A.perkara_id
                            WHERE A.alur_perkara_id NOT IN (18,112,113,114)	
                            AND A.perkara_id NOT IN (SELECT perkara_id FROM perkara_court_calendar 
                                                     WHERE (rencana_agenda LIKE '%putus%' OR rencana_agenda LIKE '%penetapan%' OR rencana_agenda LIKE '%cabut%' OR rencana_agenda LIKE '%gugur%' OR rencana_agenda LIKE '%akta perdamaian%' OR rencana_agenda LIKE '%P U T U S%'))
                            AND B.aktif = 'Y'		
                            AND D.aktif = 'Y'
                            AND C.tanggal_sidang IS NOT NULL								
                            AND A.perkara_id NOT IN (SELECT perkara_id FROM perkara_mediasi
                                                     WHERE dimulai_mediasi IS NOT NULL 
                                                     AND hasil_mediasi IS NULL)
                            AND YEAR(A.tanggal_pendaftaran) = $tahun
                            GROUP BY A.perkara_id
                            ORDER BY A.perkara_id DESC");
    return $query;
}