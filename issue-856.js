const { User } = require("./bootstrap");

loadAll(false);
loadAll(true);

function loadAll(forceRowsetLoop) {
  User.query()
    .eager("emails")
    .limit(2)
    .then(rowset => {
      console.log("=".repeat(80));

      if (forceRowsetLoop !== true) {
        console.log("NOT looping through the rowset");
        console.log(rowset)
      } else {
        console.log("Looping through the rowset");
        rowset.forEach((foo) => {
          console.log(foo);
        })
      }
    });
}
