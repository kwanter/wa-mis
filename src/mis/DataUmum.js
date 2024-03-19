const tahun = new Date('YYYY');

function publikasi_pihak(){
    $query = $this->db->query("SELECT A.perkara_id, 
                                A.tanggal_pendaftaran, 
                                A.jenis_perkara_nama, 
                                A.para_pihak,  
                                A.nomor_perkara, 
                                C.fullname,
                                A.proses_terakhir_text 
                                FROM perkara as A
                                LEFT JOIN alur_perkara as B ON B.id=A.alur_perkara_id 
                                LEFT JOIN sys_users as C ON C.username=A.diinput_oleh
                                WHERE A.pihak_dipublikasikan = 'Y' 
                                AND (A.jenis_perkara_id IN (64,25,200,293,137,224,242,88,98,63,65,130,248,346,347,365) OR A.alur_perkara_id='118') 
                                AND YEAR(A.tanggal_pendaftaran) = $tahun
                                GROUP BY A.perkara_id
                                ORDER BY A.tanggal_pendaftaran ASC");
    return $query;
} 

function saksi(){
    $query = $this->db->query("SELECT 
            A.tanggal_pendaftaran,
            A.nomor_perkara,
            A.para_pihak,
            D.panitera_nama,
            G.tanggal_sidang,
            (SELECT GROUP_CONCAT(DISTINCT hkpn.nama_gelar ORDER BY hk.id ASC SEPARATOR '<br>') AS nama_hakim 
                                                                            FROM perkara_hakim_pn AS hk
                                                                            LEFT JOIN hakim_pn AS hkpn ON hkpn.id = hk.hakim_id
                                                                            WHERE hk.perkara_id= A.perkara_id AND hk.aktif='Y' ORDER BY hk.urutan ASC) AS nama_hakim,
            A.proses_terakhir_text,
            C.nama AS alur_perkara
            FROM perkara AS A
            LEFT JOIN alur_perkara AS C ON C.id=A.alur_perkara_id
            LEFT JOIN perkara_panitera_pn AS D ON D.perkara_id=A.perkara_id
            LEFT JOIN perkara_hakim_pn AS E ON E.perkara_id=A.perkara_id
            LEFT JOIN perkara_pihak5 AS F ON F.perkara_id=A.perkara_id
            LEFT JOIN perkara_jadwal_sidang AS G ON G.perkara_id=A.perkara_id
            WHERE D.aktif='Y'
            AND D.urutan='1'
            AND E.aktif='Y'
            AND F.nama IS NULL
            AND A.alur_perkara_id NOT IN (114,8) 
            AND TIMESTAMPDIFF(DAY,G.tanggal_sidang,NOW())>'0'
            AND YEAR(G.tanggal_sidang) = ".$tahun."
            AND G.agenda LIKE '%saksi%'
            AND G.alasan_ditunda NOT LIKE '%saksi%'
            AND (G.dihadiri_oleh='1' OR G.dihadiri_oleh IS NULL)
            GROUP BY A.perkara_id
            ORDER BY G.tanggal_sidang DESC");
    return $query;
}