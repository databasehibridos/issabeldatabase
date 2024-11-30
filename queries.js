const mysql = require('mysql2');

// MySQL connection
const db =
    mysql.createConnection({
        host: '192.168.200.249',
        user: 'root',
        password: 'N0m3l4s3',
        database: 'call_center',
    });

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

const getUsers = (req, res) => {
    const searchTerm = req.query.term;
    if (!searchTerm) {
        return res.status(400)
            .json(
                {
                    error: 'Search term is required'
                }
            );
    }

    const query = `
	SELECT * FROM agent
    WHERE name LIKE ?
`;

    // Use '%' to perform a partial match
    const searchValue = `%${searchTerm}%`;

    db.query(query, [searchValue, searchValue],
        (err, results) => {
            if (err) {
                console
                    .error('Error executing search query:', err);
                return res.status(500)
                    .json(
                        {
                            error: 'Internal server error'
                        });
            }

            res.json(results);
        });
}


const getRange = (req, res) => {

    // app.get("/search/:start/:finish", (req, res) => {
    // const query = sql`SELECT * FROM user WHERE id = ${req.params.id}`
    const query =`SELECT c.uniqueid, c.callerid numero, q.queue,c.datetime_entry_queue fecha, time(c.datetime_entry_queue) horaingreso, c.datetime_end horaabandono,(unix_timestamp(c.datetime_end) - unix_timestamp(datetime_entry_queue))espero 
        FROM call_center.call_entry c INNER JOIN call_center.queue_call_entry q ON c.id_queue_call_entry = q.id 
        WHERE c.status = 'abandonada' AND datetime_entry_queue BETWEEN "${req.params.start}" AND "${req.params.finish}";`

        db.query(query, [req.params.start, req.params.finish],
            (err, results) => {
                if (err) {
                    console
                        .error('Error executing search query:', err);
                    return res.status(500)
                        .json(
                            {
                                error: 'Internal server error'
                            });
                }
    
                res.json(results);
            });
    // });
}

module.exports = {
    getUsers,
    getRange,
    //   getUserById,
    //   createUser,
    //   updateUser,
    //   deleteUser,
}