require("./config");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    ok: true,
    result: "Servicio funcionando",
  });
});

app.get("/form", (req, res) => {
  res.json({
    ok: true,
    type: "GET Method",
    result: req.query,
  });
});

app.post("/form", (req, res) => {
  res.json({
    ok: true,
    type: "POST Method",
    result: req.body,
  });
});

app.get("/regions", (req, res) => {
  let regions = [
    {
      id: "1",
      name: "Antioquia",
    },
    {
      id: "2",
      name: "Cauca",
    },
    {
      id: "3",
      name: "Chocó",
    },
    {
      id: "4",
      name: "Cundinamarca",
    },
    {
      id: "5",
      name: "Valle del Cauca",
    },
  ];

  res.json({
    ok: true,
    result: regions,
  });
});

app.get("/cities", (req, res) => {
  let cities = getCities(req.query.region_id);

  res.json({
    ok: true,
    result: cities,
  });
});

function getCities(id) {
  var i = 0;
  if (id == "1") {
    return [
      {
        id: id + "_" + ++i,
        name: "Medellín",
      },
      {
        id: id + "_" + ++i,
        name: "Bello",
      },
      {
        id: id + "_" + ++i,
        name: "Sabaneta",
      },
      {
        id: id + "_" + ++i,
        name: "Envigado",
      },
      {
        id: id + "_" + ++i,
        name: "Amaga",
      },
    ];
  }
  if (id == "2") {
    return [
      {
        id: id + "_" + ++i,
        name: "Puerto Tejada",
      },
      {
        id: id + "_" + ++i,
        name: "Popayán",
      },
      {
        id: id + "_" + ++i,
        name: "Santander de Quilichao",
      },
      {
        id: id + "_" + ++i,
        name: "Piendamó",
      },
    ];
  }
  if (id == "3") {
    return [
      {
        id: id + "_" + ++i,
        name: "Quibdó",
      },
      {
        id: id + "_" + ++i,
        name: "Nuquí",
      },
      {
        id: id + "_" + ++i,
        name: "Acandí",
      },
      {
        id: id + "_" + ++i,
        name: "Tutunendo",
      },
    ];
  }
  if (id == "4") {
    return [
      {
        id: id + "_" + ++i,
        name: "Bogotá",
      },
      {
        id: id + "_" + ++i,
        name: "Zipaquirá",
      },
      {
        id: id + "_" + ++i,
        name: "Facatativá",
      },
      {
        id: id + "_" + ++i,
        name: "Soacha",
      },
      {
        id: id + "_" + ++i,
        name: "Girardot",
      },
    ];
  }
  if (id == "5") {
    return [
      {
        id: id + "_" + ++i,
        name: "Santiago de Cali",
      },
      {
        id: id + "_" + ++i,
        name: "El Cerrito",
      },
      {
        id: id + "_" + ++i,
        name: "Guadalajara de Buga",
      },
      {
        id: id + "_" + ++i,
        name: "Tuluá",
      },
      {
        id: id + "_" + ++i,
        name: "Jamundí",
      },
      {
        id: id + "_" + ++i,
        name: "Yumbo",
      },
      {
        id: id + "_" + ++i,
        name: "Palmira",
      },
    ];
  }
  return [];
}

app.listen(process.env.PORT, (err) => {
  console.log(`Running on port: ${process.env.PORT}`);
});
