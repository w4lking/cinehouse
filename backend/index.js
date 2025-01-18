import express from "express";
import {
  deleteUser,
  getHistoricoDeTransacoes,
  getRelatorioLocacao,
} from "./dataBaseQuerys.js";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import PDFKit from "pdfkit";
import fs from "fs";

dotenv.config();
const app = express();
const port = 3000;
const pdf = new PDFKit();

app.use(express.json());

/*
app.get("/pdf", (req, res) => {
  async function generatePDF() {
    const relatorio = await getRelatorioLocacao();

    const table = {
      headers: ["Nome do Filme", "Quantidade", "Valor"],
      rows: relatorio.map((item) => [
        item.nomeFilme,
        item.quantidade,
        item.valorTotal,
      ]),
    };

    pdf.text("Relatório de Locações", { align: "center" });

    const startX = 50;
    const startY = 100;
    const rowHeight = 20;
    const colWidth = 215;

    // Draw headers
    table.headers.forEach((header, i) => {
      pdf.text(header, startX + i * colWidth, startY);
    });

    // Draw header line
    pdf
      .moveTo(startX, startY + rowHeight)
      .lineTo(startX + colWidth * table.headers.length, startY + rowHeight)
      .stroke();

    // Draw rows
    table.rows.forEach((row, rowIndex) => {
      const y = startY + (rowIndex + 1) * rowHeight;
      row.forEach((cell, i) => {
        pdf.text(cell.toString(), startX + i * colWidth, y);
      });

      // Draw row line
      pdf
        .moveTo(startX, y + rowHeight)
        .lineTo(startX + colWidth * table.headers.length, y + rowHeight)
        .stroke();
    });

    // Draw vertical lines
    for (let i = 0; i <= table.headers.length; i++) {
      const x = startX + i * colWidth;
      pdf
        .moveTo(x, startY)
        .lineTo(x, startY + rowHeight * (table.rows.length + 1))
        .stroke();
    }

    pdf.pipe(fs.createWriteStream("output.pdf"));
    pdf.end();
  }
});
*/

app.get("/download-pdf", (req, res) => {
  // Configurar o cabeçalho para download
  res.setHeader("Content-Disposition", 'attachment; filename="arquivo.pdf"');
  res.setHeader("Content-Type", "application/pdf");

  // Criar um documento PDF
  const doc = new PDFDocument();

  // Canalizar o PDF para a resposta HTTP
  doc.pipe(res);

  // Adicionar conteúdo ao PDF
  doc.fontSize(25).text("Olá, este é um PDF gerado com PDFKit!", 100, 100);

  doc.addPage().fontSize(20).text("Esta é uma nova página.", 100, 100);

  // Finalizar a escrita do documento
  doc.end();
});

// Deleta um usuário pelo id, informado pelo parâmetro da rota.
app.delete("/usuarios/:id", async (req, res) => {
  const response = await deleteUser(req.params.id);
  res.status(202).send(response);
});

// Obtém o histórico de transações de um usuário pelo id, informado pelo parâmetro da rota.
app.get("/historicoTransacoes/:id", async (req, res) => {
  const response = await getHistoricoDeTransacoes(req.params.id);
  res.status(200).send(response);
});

app.get("/relatorio/locacao", async (req, res) => {
  const response = await getRelatorioLocacao();
  res.status(200).send(response);
});

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Deu merda!");
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
