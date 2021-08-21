const { Router } = require("express");
const { Client, Pool } = require("pg");
const router = Router();
const mailer = require("../utils/mailer");
const { generateCode } = require("../utils/generateCode");
const { dateCompare } = require("../utils/dateCompare");
const { hashPassword } = require("../utils/hashPassword");

const pool = new Pool();

router.post("/forgot-password", async (req, res) => {
    await pool.connect();
    const { email } = req.body;
    const userFound = await pool.query(
        `SELECT email FROM users WHERE email = '${email}'`
    );

    if (userFound.rowCount === 1) {
        const clientCode = generateCode();
        const validTill = new Date(Date.now() + 600000);
        const emailStatus = (await mailer(email, clientCode)).accepted;
        await pool
            .query(
                `INSERT INTO codes VALUES('${email}', '${clientCode}', $1::timestamp)`,
                [validTill]
            )
            .then((res) => console.log(res))
            .catch((e) => console.error(e));

        if (emailStatus[0] === email) {
            res.json({
                message: "Email sent successfully!",
            });
        } else {
            res.json({
                message: "Cannot send email!",
            });
        }
    } else {
        res.json({
            message: "No user found with this email!",
        });
    }
});

router.post("/validate-code", async (req, res) => {
    await pool.connect();
    const { code, email } = req.body;
    const checkCode = await pool.query(
        `SELECT * FROM codes WHERE code = '${code}'`
    );

    if (checkCode.rowCount === 0) {
        res.json({
            message: "Sorry, the code is invalid!",
        });
    } else {
        checkCode.rows.forEach((row) => {
            const isCodeValid = dateCompare(row.valid_till);

            if (row.code == code && row.email == email && isCodeValid) {
                res.json({
                    message: "The code is correct!",
                });
            } else {
                res.json({
                    message: "There was a problem!",
                });
            }
        });
    }
});

router.post("/code-used", async (req, res) => {
    await pool.connect();

    const { code } = req.body;

    await pool
        .query(`DELETE FROM codes WHERE code = '${code}'`)
        .then((result) => res.json({message: 'Code deleted'}))
        .catch((e) => res.json({message: 'The code could not be deleted'}));

});

router.post("/update-password", async (req, res) => {
    await pool.connect();

    let { newPassword, email } = req.body;

    newPassword = hashPassword(newPassword);

    const updatedPassword = await pool
        .query(
            `UPDATE users SET password = '${newPassword}' WHERE email = '${email}'`
        )
        .then((result) => {
            res.json({
                message: "Password updated successfully!",
            });
        })
        .catch((e) => {
            console.error(e);

            res.json({
                message: "There was a problem!",
                error: e.message,
                stack: e.stack,
            });
        });
});

module.exports = router;
