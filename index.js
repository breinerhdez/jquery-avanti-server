require("./config");
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

const { subirArchivo } = require("./subir-archivo");
const fileupload = require("express-fileupload");

app.use(fileupload());

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(express.json());

var formData = [];
app.get("/", (req, res) => {
  res.json({
    // ok: true,
    data: formData,
  });
});

app.post("/files", async (req, res) => {
  try {
    // el segundo parámetro debe ser un array con las extensiones permitidas
    // si no se envía usa las que tenga por defecto
    const nombre = await subirArchivo(req.files, ["pdf"], "");
    res.json({ nombre });
  } catch (msg) {
    res.status(400).json({ msg });
  }
});

/**
 * :name es el nombre del archivo sin la extensión
 */
app.get("/files/base64/:name", async (req, res) => {
  try {
    let nameFile = path.join(__dirname, "/uploads/", `${req.params.name}.pdf`);
    var buffer = new Buffer(nameFile);
    var result = [
      {
        name: `${req.params.name}.pdf`,
        file: buffer.toString("base64"),
      },
    ];

    res.json({
      ok: true,
      result,
    });
  } catch (msg) {
    res.status(400).json({ msg });
  }
});

app.get("/files/get-file/:name", async (req, res) => {
  try {
    let nameFile = path.join(__dirname, "/uploads/", `${req.params.name}.pdf`);
    res.sendFile(nameFile);
  } catch (msg) {
    res.status(400).json({ msg });
  }
});

app.get("/form", (req, res) => {
  formData.push(req.query);
  res.json({
    ok: true,
    type: "GET Method",
    result: req.query,
  });
});

app.post("/form", (req, res) => {
  formData.push(req.body);
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
