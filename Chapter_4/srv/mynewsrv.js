module.exports = srv => {
  srv.before("CREATE", "InsertStudent", (req, res) => {
    //checks email are not personal gmail
    if (typeof req.data.email === "undefined") req.error(500, "Email Missing");

    if (req.data.email.toLowerCase().indexOf("gmail") !== -1) {
      req.error(500, "Personal Email Id Not allowed");
    }
  });
};
