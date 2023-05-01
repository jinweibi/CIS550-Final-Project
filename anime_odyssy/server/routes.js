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
  const password = req.query.password;
  connection.query(
    `
    SELECT *
    FROM user
    WHERE username = ${username}
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
        const get_password = data[0].paassword;
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
};

// Route 2: POST /register
const register = async function (req, res) {
  const username = req.query.username;
  // hash function needed (TODO)
  const password = req.query.password;
  const gender = req.query.gender;
  const age = req.query.age;
  connection.query(
    `
    INSERT INTO user (username, password, gender, age) VALUES (${username}, ${password}, ${gender}, ${age})
  `,
    (err, data) => {
      if (err) {
        // password already exist or other issue (PK constraint)
        console.log(err);
        res.status(409).send("Status: Conflict");
      } else {
        console.log("1 user info inserted");
        res.status(201).status("Status: Created");
      }
    }
  );
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
        with anime_satisfy as (select * from anime3
                              where title like '%${title}%'
                              and score >= ${score_low}
                              and score <= ${score_high}
                              and favorites >= ${favorites_low}
                              and favorites <= ${favorites_high}  
                              and total_duration >= ${total_duration_low}
                              and total_duration <= ${total_duration_high}                   
                              and genres like '%${genres}%'
                              and release_year like '%${release_year}%')
        select C.names, C.hair_color, C.character_id, C.gender, C.tags, C.anime, C.manga
        from anime_satisfy, characters C
        where C.anime like CONCAT('%\'', A.title, '\'%') 
              or C.manga like CONCAT('%\'', A.title, '\'%')
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
        with A as (select * from anime3
                  where title like '%${title_or_name}%'
                  and score >= ${score_low}
                  and score <= ${score_high}
                  and favorites >= ${favorites_low}
                  and favorites <= ${favorites_high}  
                  and total_duration >= ${total_duration_low}
                  and total_duration <= ${total_duration_high}                   
                  and genres like '%${genres}%'
                  and release_year like '%${release_year}%'
                  and total_duration is not null)
        select A.source, A.title, A.episodes, A.score, A.URL, A.favorites, A.genres, A.start_date, A.total_duration
        from A, characters C
        where C.anime like CONCAT('%\'', A.title, '\'%') 
              or C.manga like CONCAT('%\'', A.title, '\'%')
              and C.hair_color like '%${char_hair_color}%'
              and C.gender like '%${char_gender}%';
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
        with A as (select * from anime3
                  where title like '%${title_or_name}%'
                  and score >= ${score_low}
                  and score <= ${score_high}
                  and favorites >= ${favorites_low}
                  and favorites <= ${favorites_high}  
                  and total_duration >= ${total_duration_low}
                  and total_duration <= ${total_duration_high}                   
                  and genres like '%${genres}%'
                  and release_year like '%${release_year}%')
        select A.source, A.title, A.episodes, A.score, A.URL, A.favorites, A.genres, A.start_date, A.total_duration
        from A, characters C
        where C.anime like CONCAT('%\'', A.title, '\'%') 
              or C.manga like CONCAT('%\'', A.title, '\'%')
              and C.hair_color like '%${char_hair_color}%'
              and C.gender like '%${char_gender}%';
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
        with A as (select * from anime3
                  where title like '%${title_or_name}%'
                  and score >= ${score_low}
                  and score <= ${score_high}
                  and favorites >= ${favorites_low}
                  and favorites <= ${favorites_high}  
                  and total_duration >= ${total_duration_low}
                  and total_duration <= ${total_duration_high}                   
                  and genres like '%${genres}%'
                  and release_year like '%${release_year}%')
        select A.source, A.title, A.episodes, A.score, A.URL, A.favorites, A.genres, A.start_date, A.total_duration
        from A, characters C
        where C.anime like CONCAT('%\'', A.title, '\'%') 
              or C.manga like CONCAT('%\'', A.title, '\'%')
              and C.hair_color like '%${char_hair_color}%'
              and C.gender like '%${char_gender}%';
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
  // delete limit 10; 
  if (type === "anime") {
    // get anime
    connection.query(
      `
    select * 
    from anime3 
    where total_duration is not null
    order by score, favorites desc
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
  } else {
    // get manga
    connection.query(
      `
    select * 
    from anime3 
    where total_duration is null
    order by score, favorites desc
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
  const source = req.params.source;
  const title = req.params.title;

  connection.query(
    `
  with t1 as
   (SELECT *
    FROM anime3 A, characters C
    WHERE (C.anime LIKE CONCAT('%\'', A.title, '\'%') or C.anime LIKE CONCAT('%\'', A.title, '\'%')))
    select t1.source, t1.title, t1.score, t1.genres, t1.start_date, t1.total_duration, t1.episodes, t1.URL, GROUP_CONCAT(DISTINCT t1.names) AS names , GROUP_CONCAT(DISTINCT t1.character_id) AS character_id
    from t1
    where t1.title = '${title}' and t1.source = '${source}'
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

// Route 8: character/characterId
const get_character_id = async function (req, res) {
  // TODO (TASK 7): implement a route that given an album_id, returns all songs on that album ordered by track number (ascending)
  // res.json([]); // replace this with your implementation
  const character_id = req.params.character_id;
  // like 'Fullmetal Alchemist: Brotherhood'
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
// POST/DELETE/favorites

// Route 10: GET /get_favorite
const get_favorite = async function (req, res) {
  // TODO (TASK 7): implement a route that given an album_id, returns all songs on that album ordered by track number (ascending)
  // res.json([]); // replace this with your implementation
  const fav = req.params.title;
  // like 'Fullmetal Alchemist: Brotherhood'
  connection.query(
    `
  With userFavorite AS
  (select source, title,genres
  from anime3 join characters on source = 'manga'
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
  const type = req.query.type ?? "anime";
  // delete limit 10; 
  
  // if (type === "anime") {
    // get anime
    connection.query(
      `
      select *
      from anime3
      where total_duration is not null
      order by score desc
      limit 100;
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
  // } 
};

// Route 12: GET /animes_year/:type
// genres like '%${genres}%'
// where total_duration is not null and anime3.genres LIKE CONCAT ('%\'', '${genre}' , '\'%')
// select * 
//     from anime3 
    
//     where (total_duration is not null) and (anime3.genres LIKE CONCAT ('%\'', '${genre}' , '\'%'))
//     order by score, favorites desc
//     limit 100
const animes_year = async function (req, res) {
  const year = req.params.year;
  
    connection.query(
      `
      select *
from anime3
where ( anime3.start_date LIKE '%${year}%')
order by score desc
limit 100;
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


// Route 13: GET /all_animes/:animes_genre
const animes_genre = async function (req, res) {
  // const type = req.query.type ?? "anime";
  const genres = req.params.animes_genre;
  // delete limit 10; 
  
  // if (type === "anime") {
    // get anime
    connection.query(
      `
      select *
      from anime3
      where (anime3.total_duration is not null) and (anime3.genres like '%${genres}%')
      order by score desc
      limit 300;
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
  // } 
};

// Route 14: GET /anime/get_anime_card
const get_anime_card = async function (req, res) {
 
  const title = req.params.get_anime_card;

  connection.query(
    `
    select *
      from anime3
      where (anime3.total_duration is not null) and (anime3.title like '${title}')
      order by score desc
      limit 300;
 
  `,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
        res.json({data});
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
  all_animes,
  animes_year,
  animes_genre,
  get_anime_card,
};
