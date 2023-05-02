const mysql = require("mysql");
const config = require("./config.json");

// Creates MySQL connection using database credential provided in config.json
// Do not edit. If the connection fails, make sure to check that config.json is filled out correctly
const connection = mysql.createConnection({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db,
});
connection.connect((err) => err && console.log(err));

/************************
 * ADVANCED INFO ROUTES *
 ************************/

// Route 0: GET /random
const random = async function (req, res) {
  connection.query(
    `
    SELECT *
    FROM anime3
    WHERE genres LIKE "%Fantasy%" AND genres LIKE "%Comedy%"
    ORDER BY RAND()
    LIMIT 1
  `,
    (err, data) => {
      if (err || data.length === 0) {
        // if there is an error for some reason, or if the query is empty (this should not be possible)
        // print the error message and return an empty object instead
        console.log(err);
        res.json({});
      } else {
        // response in JSON format
        res.json({
          data,
        });
      }
    }
  );
};

// Route 1: POST /login
const login = async function (req, res) {
  const username = req.query.username;
  // hash function needed (TODO)
  const password = req.query.password ?? "";
  if (password == "") {
    connection.query(
      `
  const password = req.query.password ?? "";
  if (password == "") {
    connection.query(
      `
    SELECT *
    FROM user
    WHERE username = "${username}"
  `,
      (err, data) => {
        if (err || data.length === 0) {
          // user does not exist
          // if there is an error for some reason, or if the query is empty (this should not be possible)
          // print the error message and return an empty object instead
          console.log(err);
          res.status(404).send("Status: Not Found");
        } else {
          res.status(200).send("Status: OK");
        }
      }
    );
  } else {
    connection.query(
      `
    SELECT *
    FROM user
    WHERE username = "${username}"
  `,
      (err, data) => {
        if (err || data.length === 0) {
          // user does not exist
          // if there is an error for some reason, or if the query is empty (this should not be possible)
          // print the error message and return an empty object instead
          console.log(err);
          res.status(404).send("Status: Not Found");
        } else {
          // user exist do authentication check
          const get_password = data[0].password;
          // authentication check
          if (password === get_password) {
            // response with OK and msg
            res.status(200).send("Status: OK");
          } else {
            // response with 401 and error msg
            res.status(401).send("Status: Unauthorized");
          }
        }
      }
    );
  }
};

// Route 2: POST /register
const register = async function (req, res) {
  const username = req.query.username;
  // hash function needed (TODO)
  const password = req.query.password;
  const gender = req.query.gender;
  const age = req.query.age;
  if (!gender && !age) {
    connection.query(
      `INSERT INTO user (username, password, gender, age) VALUES ('${username}', '${password}', NULL, NULL)`,
      (err, data) => {
        if (err) {
          // password already exist or other issue (PK constraint)
          console.log(err);
          res.status(409).send("Status: Conflict");
        } else {
          console.log("1 user info inserted");
          res.status(201).send("Status: Created");
        }
      }
    );
  } else if (!gender) {
    connection.query(
      `INSERT INTO user (username, password, gender, age) VALUES ('${username}', '${password}', NULL, ${age})`,
      (err, data) => {
        if (err) {
          // password already exist or other issue (PK constraint)
          console.log(err);
          res.status(409).send("Status: Conflict");
        } else {
          console.log("1 user info inserted");
          res.status(201).send("Status: Created");
        }
      }
    );
  } else if (!age) {
    connection.query(
      `INSERT INTO user (username, password, gender, age) VALUES ('${username}', '${password}', '${gender}', NULL)`,
      (err, data) => {
        if (err) {
          // password already exist or other issue (PK constraint)
          console.log(err);
          res.status(409).send("Status: Conflict");
        } else {
          console.log("1 user info inserted");
          res.status(201).send("Status: Created");
        }
      }
    );
  } else {
    connection.query(
      `INSERT INTO user (username, password, gender, age) VALUES ('${username}', '${password}', '${gender}', ${age})`,
      (err, data) => {
        if (err) {
          // password already exist or other issue (PK constraint)
          console.log(err);
          res.status(409).send("Status: Conflict");
        } else {
          console.log("1 user info inserted");
          res.status(201).send("Status: Created");
        }
      }
    );
  }
  if (!gender && !age) {
    connection.query(
      `INSERT INTO user (username, password, gender, age) VALUES ('${username}', '${password}', NULL, NULL)`,
      (err, data) => {
        if (err) {
          // password already exist or other issue (PK constraint)
          console.log(err);
          res.status(409).send("Status: Conflict");
        } else {
          console.log("1 user info inserted");
          res.status(201).send("Status: Created");
        }
      }
    );
  } else if (!gender) {
    connection.query(
      `INSERT INTO user (username, password, gender, age) VALUES ('${username}', '${password}', NULL, ${age})`,
      (err, data) => {
        if (err) {
          // password already exist or other issue (PK constraint)
          console.log(err);
          res.status(409).send("Status: Conflict");
        } else {
          console.log("1 user info inserted");
          res.status(201).send("Status: Created");
        }
      }
    );
  } else if (!age) {
    connection.query(
      `INSERT INTO user (username, password, gender, age) VALUES ('${username}', '${password}', '${gender}', NULL)`,
      (err, data) => {
        if (err) {
          // password already exist or other issue (PK constraint)
          console.log(err);
          res.status(409).send("Status: Conflict");
        } else {
          console.log("1 user info inserted");
          res.status(201).send("Status: Created");
        }
      }
    );
  } else {
    connection.query(
      `INSERT INTO user (username, password, gender, age) VALUES ('${username}', '${password}', '${gender}', ${age})`,
      (err, data) => {
        if (err) {
          // password already exist or other issue (PK constraint)
          console.log(err);
          res.status(409).send("Status: Conflict");
        } else {
          console.log("1 user info inserted");
          res.status(201).send("Status: Created");
        }
      }
    );
  }
};

// Route 3: GET /search
const search = async function (req, res) {
  const type = req.query.type ?? "anime_and_manga"; // "anime", "manga", "character"
  const title_or_name = req.query.title_or_name ?? ""; // title for anime and manga, name for character
  const score_low = req.query.score_low ?? 0;
  const score_high = req.query.score_high ?? 10;
  const favorites_low = req.query.favorites_low ?? 0;
  const favorites_high = req.query.favorites_high ?? 205000;
  const total_duration_low = req.query.total_duration_low ?? 0; // only for anime (should be disabled in client if choose manga)
  const total_duration_high = req.query.total_duration_low ?? 20000;
  const genres = req.query.genres ?? "";
  const release_year = req.query.release_year ?? "";
  const char_hair_color = req.query.hair_color ?? "";
  const char_gender = req.query.energy_low ?? "";

  if (type === "character") {
    // characters
    connection.query(
      `
        select C.names, C.hair_color, C.character_id, C.gender, C.tags, C.anime, C.manga
        from (select * from anime3
                              where title like '%${title}%'
                              and score >= ${score_low}
                              and score <= ${score_high}
                              and favorites >= ${favorites_low}
                              and favorites <= ${favorites_high}  
                              and total_duration >= ${total_duration_low}
                              and total_duration <= ${total_duration_high}                   
                              and genres like '%${genres}%'
                              and start_date like '%${release_year}%') anime_satisfy, characters C
        where C.anime like CONCAT('%', A.title, '%') 
              or C.manga like CONCAT('%', A.title, '%')
              and C.hair_color like '%${char_hair_color}%'
              and C.gender like '%${char_gender}%'
              and C.name like '%${title_or_name}%';
        `,
      (err, data) => {
        if (err) {
          console.log(err);
          res.json({});
        } else {
          res.json(data);
        }
      }
    );
  } else if (type === "anime") {
    // animes
    connection.query(
      `
        SELECT A.source, A.title, A.episodes, A.score, A.URL, A.favorites, A.genres, A.start_date, A.total_duration
        FROM (
          SELECT * FROM anime3
          WHERE title LIKE '%${title_or_name}%'
          AND score >= ${score_low}
          AND score <= ${score_high}
          AND favorites >= ${favorites_low}
          AND favorites <= ${favorites_high}  
          AND total_duration >= ${total_duration_low}
          AND total_duration <= ${total_duration_high}                   
          AND genres LIKE '%${genres}%'
          AND start_date LIKE '%${release_year}%'
        ) A
        JOIN characters C ON C.anime LIKE CONCAT('%', A.title, '%')
        WHERE C.hair_color LIKE '%${char_hair_color}%'
        AND C.gender LIKE '%${char_gender}%'
        LIMIT 50;
        `,
      (err, data) => {
        if (err) {
          console.log(err);
          res.json({});
        } else {
          res.json(data);
        }
      }
    );
  } else if (type === "manga") {
    // animes
    connection.query(
      `
        SELECT A.source, A.title, A.episodes, A.score, A.URL, A.favorites, A.genres, A.start_date, A.total_duration
        FROM (
          SELECT * FROM anime3
          WHERE title LIKE '%${title_or_name}%'
          AND score >= ${score_low}
          AND score <= ${score_high}
          AND favorites >= ${favorites_low}
          AND favorites <= ${favorites_high}  
          AND total_duration IS NULL                 
          AND genres LIKE '%${genres}%'
          AND start_date LIKE '%${release_year}%'
        ) A
        JOIN characters C ON C.manga LIKE CONCAT('%', A.title, '%')
        WHERE C.hair_color LIKE '%${char_hair_color}%'
        AND C.gender LIKE '%${char_gender}%'
        LIMIT 50;
        `,
      (err, data) => {
        if (err) {
          console.log(err);
          res.json({});
        } else {
          res.json(data);
        }
      }
    );
  } else {
    // anime and manga
    connection.query(
      `
        SELECT A.source, A.title, A.episodes, A.score, A.URL, A.favorites, A.genres, A.start_date, A.total_duration
        FROM (
          SELECT * FROM anime3
          WHERE title LIKE '%${title_or_name}%'
          AND score >= ${score_low}
          AND score <= ${score_high}
          AND favorites >= ${favorites_low}
          AND favorites <= ${favorites_high}  
          AND total_duration >= ${total_duration_low}
          AND total_duration <= ${total_duration_high}                   
          AND genres LIKE '%${genres}%'
          AND start_date LIKE '%${release_year}%'
        ) A
        JOIN characters C ON C.anime LIKE CONCAT('%', A.title, '%')
        WHERE C.hair_color LIKE '%${char_hair_color}%'
        AND C.gender LIKE '%${char_gender}%'
        LIMIT 50;
        `,
      (err, data) => {
        if (err) {
          console.log(err);
          res.json({});
        } else {
          res.json(data);
        }
      }
    );
  }
};

// Route 4: Get /recent_anime
const recent_10_animes = async function (req, res) {
  const type = req.query.type ?? "anime";

  if (type === "anime") {
    // get anime
    connection.query(
      `
    select * 
    from anime3 
    where total_duration is not null
    order by start_date desc
    limit 10; 
  `,
      (err, data) => {
        if (err || data.length === 0) {
          console.log(err);
          res.json({});
        } else {
          res.json(data);
        }
      }
    );
  } else {
    // get manga
    connection.query(
      `
    select * 
    from anime3 
    where total_duration is null
    order by start_date desc
    limit 10; 
    
  `,
      (err, data) => {
        if (err || data.length === 0) {
          console.log(err);
          res.json({});
        } else {
          res.json(data);
        }
      }
    );
  }
};

// Route 5: GET /top_10_anime/:type
const top_animes = async function (req, res) {
  const type = req.query.type ?? "anime";

  if (type === "anime") {
    // get anime
    connection.query(
      `
    select * 
    from anime3 
    where total_duration is not null
    order by score, favorites desc
    limit 10; 
  `,
      (err, data) => {
        if (err || data.length === 0) {
          console.log(err);
          res.json({});
        } else {
          res.json(data);
        }
      }
    );
  } else {
    // get manga
    connection.query(
      `
    select * 
    from anime3 
    where total_duration is null
    order by score, favorites desc
    limit 10; 
    
  `,
      (err, data) => {
        if (err || data.length === 0) {
          console.log(err);
          res.json({});
        } else {
          res.json(data);
        }
      }
    );
  }
};

// Route 6: GET /top_10_manga
const top_mangas = async function (req, res) {
  const page = req.query.page;
  // TODO (TASK 8): use the ternary (or nullish) operator to set the pageSize based on the query or default to 10
  const pageSize = req.query.page_size ?? 10;

  if (!page) {
    connection.query(
      `
    select source, title, score, url, favorites, genres, start_date
    from anime3
    where ( anime.source = 'manga' and
    (anime3.start_date LIKE '%2020%'
                    OR anime3.start_date LIKE '%2021%'
                    OR anime3.start_date LIKE '%2022%'
                    OR anime3.start_date LIKE '%2023%'))
    order by score desc
    limit 10; 
  `,
      (err, data) => {
        if (err || data.length === 0) {
          console.log(err);
          res.json({});
        } else {
          res.json(data);
        }
      }
    );
  } else {
    const off = (page - 1) * pageSize;
    connection.query(
      `
    select source, title, score, url, favorites, genres, start_date
    from anime3
    where ( anime.source = 'manga' and
    (anime3.start_date LIKE '%2020%'
                    OR anime3.start_date LIKE '%2021%'
                    OR anime3.start_date LIKE '%2022%'
                    OR anime3.start_date LIKE '%2023%'))
    order by score desc
    limit 10; 
    LIMIT ${pageSize} OFFSET ${off}
    
  `,
      (err, data) => {
        if (err || data.length === 0) {
          console.log(err);
          res.json({});
        } else {
          res.json(data);
        }
      }
    );
  }
};

// Route 7: GET /get_anime/manga_information
const get_manga_anime_info = async function (req, res) {
  const source = req.params.source ?? "123";
  const title = req.params.title ?? "";
  // console.log(source);
  // console.log(title);

  connection.query(
    `
    select *
    from anime3
    where title LIKE '${title}' and source LIKE '${source}'
  `,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
        console.log(data);
      }
    }
  );
};

// Route 8: character/characterId
const get_character_id = async function (req, res) {
  // TODO (TASK 7): implement a route that given an character_id, returns all songs on that album ordered by track number (ascending)
  // res.json([]); // replace this with your implementation
  const character_id = req.params.character_id;
  // like 'Fullmetal Alchemist: Brotherhood'
  console.log(character_id)
  connection.query(
    `
  select names, hair_color, gender, tags, anime3.source, anime3.title
  from characters, anime3
  where (characters.anime LIKE CONCAT('%\'', anime3.title, '\'%') or
  characters.manga LIKE CONCAT('%\'', anime3.title, '\'%') ) and
  character_id = '${character_id}'
  `,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }
    }
  );
};

// Route 9: favorites

const get_user_favorites = async function (req, res) {
  const username = req.params.username ?? "";

  connection.query(
    `
  SELECT *
  FROM favorite
  WHERE username = "${username}"
  `,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }
    }
  );
};

// add favorites
// POST /add_favorites/:username/:title/:source
const add_favorite = async function (req, res) {
  const username = req.params.username ?? "";
  const title = req.params.title ?? "";
  const source = req.params.source ?? "";
  // const url = req.params.url ?? "";

  connection.query(
    `
  INSERT INTO favorite (username, title, source) VALUES ('${username}', '${title}', '${source}')
  `,
    (err, data) => {
      if (err) {
        // password already exist or other issue (PK constraint)
        console.log(err);
        res.status(409).send("Status: Conflict");
      } else {
        console.log("1 favorite item inserted");
        res.status(201).send("Status: Created");
      }
    }
  );
};

// Route 9: delete favorites
// POST /delete_favorites/:username/:title/:source
const dele_favorite = async function (req, res) {
  const username = req.params.username ?? "";
  const title = req.params.title ?? "";
  const source = req.params.source ?? "";

  connection.query(
    `
  DELETE FROM favorite WHERE username = "${username}" AND source = "${source}" AND title = "${title}"
  `,
    (err, data) => {
      if (err) {
        // password already exist or other issue (PK constraint)
        console.log(err);
        res.status(500).send("Status: Internal Server Error");
      } else {
        console.log("1 favorite item deleted");
        res.status(200).send("Status: OK");
      }
    }
  );
};

// Route 10: GET /get_favorite
const get_favorite = async function (req, res) {
  
  const fav = req.params.title;
  // like 'Fullmetal Alchemist: Brotherhood'
  console.log(fav)
  connection.query(
    `
  With userFavorite AS
  (select source, title,genres
  from anime3 
  where title = '${fav}')

  select anime3.source, anime3.title, anime3.genres
  from anime3 ,userFavorite
  where anime3.genres = userFavorite.genres
  limit 50;
  `,
 
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }
    }
  );
};



// Route 11: GET /all_animes/:type
const all_animes = async function (req, res) {
  let genre = req.query.genre ?? ""; 
  let query = "";
  const lowscore = req.query.mangas_low ?? 0;
  const highscore = req.query.mangas_high ?? 10;

    // get anime
  query = `
    select * 
    from anime3 
    where total_duration is not null
      and (${lowscore} <= score and score<= ${highscore})
  `;
  
  if (genre) {
    query += ` and genres like '%${genre}%'`; 
  }
  query += " order by score desc limit 300";
  connection.query(query, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data);
    }
  });


};

// Route 11: GET /all_mangas/:type
const all_mangas = async function (req, res) {
  const type = req.query.type ?? "manga";
  let genre = req.query.genre ?? ""; 
  let query = "";
  const lowscore = req.query.mangas_low ?? 0;
  const highscore = req.query.mangas_high ?? 10;

  if (type === "manga") {
    // get anime
    query = `
      select * 
      from anime3 
      where total_duration is null
        and ${lowscore} <= score and score<= ${highscore}
    `;
  } else {
    // get manga
    query = `
      select * 
      from anime3 
      where total_duration is not null
        and ${lowscore} <= score and score<= ${highscore}
    `;
  }
  
  if (genre) {
    query += ` and genres like '%${genre}%'`; 
  }
  query += " order by score desc limit 300";
  connection.query(query, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data);
    }
  });
};

// Route 12: GET /get_white_hair
const white_hair = async function (req, res) {
  
  const fav = req.params.title;
  // like 'Fullmetal Alchemist: Brotherhood'
  console.log(fav)
  connection.query(
    `
    WITH T1 AS ( SELECT A.title FROM anime1 A JOIN
      (SELECT 'Action' AS genre UNION ALL SELECT 'Adventure' UNION ALL SELECT 'Comedy'
      UNION ALL SELECT 'Drama' UNION ALL SELECT 'Fantasy') G ON A.genres
      LIKE CONCAT('%', G.genre, '%') GROUP BY A.title HAVING COUNT(DISTINCT G.genre) = 5),
      T2 AS ( SELECT AVG(score) AS average_score FROM anime ),
      T3 AS ( SELECT title FROM anime, T2 WHERE score > T2.average_score GROUP BY title),
      T4 AS ( SELECT T1.title FROM T1, T3 WHERE T1.title = T3.title )
      SELECT C.character_id, C.names FROM characters C,
                                          T4 WHERE C.manga LIKE CONCAT('%', T4.title, '%')
                                                OR C.anime LIKE CONCAT('%', T4.title, '%')
                                                       AND C.hair_color = 'White Hair'
                                             ORDER BY C.names
      limit 20
   
  `,
 
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }
    }
  );
};

// Route 13: GET /different_hair_color
const different_hair_color = async function (req, res) {
  
  const fav = req.params.title;
  // like 'Fullmetal Alchemist: Brotherhood'
  console.log(fav)
  connection.query(
    `
    with t1 as (SELECT * FROM anime A, characters C WHERE A.source = 'manga'
                                                  AND C.anime LIKE CONCAT('%', A.title, '%')),
    t2 as (SELECT a1.title FROM anime a1 WHERE a1.source = 'manga'
                                           and (a1.start_date LIKE '2023%' OR a1.start_date LIKE '2022%'
OR a1.start_date LIKE '2021%') ORDER BY a1.favorites) select t1.hair_color, count(t1.hair_color)
    as color_num from t1 join t2 on t1.title = t2.title
                 group by t1.hair_color order by color_num desc
                 limit 10
  `,
 
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }
    }
  );
};

// Route 14: GET /different_hair_color
const popular = async function (req, res) {
  
  const fav = req.params.title;
  // like 'Fullmetal Alchemist: Brotherhood'
  console.log(fav)
  connection.query(
    `
    With top10 AS ( select source, title, score,favorites,start_date from anime
      where anime.source = 'manga' and (anime.start_date LIKE '%2020%' OR
                                        anime.start_date LIKE '%2021%' OR anime.start_date LIKE '%2022%'
                                            OR anime.start_date LIKE '%2023%')
      order by score desc limit 10)
      select characters.names, characters.hair_color, favorites,characters.gender from top10
          join characters on top10.source = 'manga' AND characters.anime LIKE CONCAT('%', top10.title, '%')
      order by favorites desc;
  `,
 
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }
    }
  );
};

// Route 15: GET /search_title
const search_title = async function (req, res) {
  
  const title = req.params.title;
  // like 'Fullmetal Alchemist: Brotherhood'
  
  connection.query(
    `
    select *
        from anime3
        where  anime3.title like '%${title}%';
  `,
 
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }
    }
  );
};


module.exports = {
  login,
  register,
  random,
  search,
  recent_10_animes,
  top_animes,
  top_mangas,
  get_manga_anime_info,
  get_character_id,
  get_favorite,
  get_user_favorites,
  add_favorite,
  dele_favorite,
  all_animes,
  all_mangas,
  white_hair,
  different_hair_color,
  popular,
  search_title,
};
