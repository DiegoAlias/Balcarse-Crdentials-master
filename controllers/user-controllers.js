const { db } = require("../database");
const { isLoggedIn } = require("../lib/auth.js");

const signin = (req, res) => {
  res.render("signin");
};

const credentials = async (req, res) => {
  const { id } = req.user;
  try {
    //Backticks (`…`)

    await db
      .query("SELECT role as role FROM users WHERE id = ?", [id])
      .then(async (rows) => {
        const role = rows[0][0];

        if (role.role == "USER_ROLE") {
          await db
            .query(
              `SELECT 
            users.fullname          as fullname, 
            relatives.name          as name, 
            relatives.lastname      as lastname, 
            relatives.dni           as dni, 
            relatives.created_at    as created_at,
            relatives.relationship  as relationship  
                FROM users 
            INNER JOIN relatives ON users.id = relatives.user_id 
            WHERE 
                users.id = ? 
                and active = 1`,
              [id]
            )
            .then(async (rows) => {
              const credentials = rows[0];

              credentials.map((e) => {
                e.created_at = new Date(e.created_at).toISOString();
                e.created_at =
                  e.created_at.split("T")[0] +
                  " : " +
                  e.created_at.split("T")[1].replace("Z", "");
              });

              return res.status(200).render("credentials", { credentials });
            });
        }

        if (role.role == "ADMIN_ROLE"){
                const users = await db.query("SELECT id, username, fullname, active FROM users" )
                .then( async (users) => {
                    const mainUsers = users[0];
                    console.log(mainUsers); 
                    res.status(200).render("users-crud", {mainUsers})
                })
        }

      });
  } catch (error) {
    console.log(error);
  }
};

const updateMainUser = async (req, res) => {
    const { id } = req.params;
    const { 
        fullname, 
        username, 
        active} = req.body; 
    
    const mainUser = {
        fullname,
        username,
        active          
    };
    console.log(id, mainUser);
    // await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
    // req.flash('success', 'Link Updated Successfully');
    //res.redirect('/credentials');
};


module.exports = {
  signin,
  credentials,
  updateMainUser
};
