const path = require("path");
const fs = require("fs");

const dbPath = path.resolve(__dirname, "../db/facts.json");

class FactsController {
  index(request, response) {
    try {
      const data = fs.readFileSync(dbPath, "utf8");
      const facts = JSON.parse(data);
      return response.status(200).json(facts);
    } catch (e) {
      console.log(e);
      return response
        .status(500)
        .json({ erro: "Não foi possível executar esta operação!" });
    }
  }

  show(request, response) {
    try {
      const data = fs.readFileSync(dbPath, "utf8");
      const facts = JSON.parse(data);
      const id = parseInt(request.params.id);
      const fact = facts.find((f) => f.id === id);
      if (!fact) {
        return response.status(404).json({ erro: "Fato não encontrado!" });
      }
      return response.status(200).json(fact);
    } catch (e) {
      console.log(e);
      return response
        .status(500)
        .json({ erro: "Não foi possível executar esta operação!" });
    }
  }

  create(request, response) {
    try {
      const data = fs.readFileSync(dbPath, "utf8");
      const facts = JSON.parse(data);
      const fact = {
        id: facts.length + 1,
        author: request.body.author,
        fact: request.body.fact,
      };
      facts.push(fact);
      fs.writeFileSync(dbPath, JSON.stringify(facts, null, 2), "utf8");
      return response.status(201).json(fact);
    } catch (e) {
      console.log(e);
      return response
        .status(500)
        .json({ erro: "Não foi possível executar esta operação!" });
    }
  }

  update(request, response) {
    try {
      const data = fs.readFileSync(dbPath, "utf8");
      const facts = JSON.parse(data);
      const id = parseInt(request.params.id);
      const fact = facts.find((f) => f.id === id);
      if (!fact) {
        return response.status(404).json({ erro: "Fato não encontrado!" });
      }
      fact.author = request.body.author;
      fact.fact = request.body.fact;
      fs.writeFileSync(dbPath, JSON.stringify(facts, null, 2), "utf8");
      return response.status(200).json(fact);
    } catch (e) {
      console.log(e);
      return response
        .status(500)
        .json({ erro: "Não foi possível executar esta operação!" });
    }
  }

  delete(request, response) {
    try {
      const data = fs.readFileSync(dbPath, "utf8");
      let facts = JSON.parse(data);
      const id = parseInt(request.params.id);
      facts = facts.filter((f) => f.id !== id);
      fs.writeFileSync(dbPath, JSON.stringify(facts, null, 2), "utf8");
      return response.status(204).send();
    } catch (e) {
      console.log(e);
      return response
        .status(500)
        .json({ erro: "Não foi possível executar esta operação!" });
    }
  }
}

module.exports = FactsController;
