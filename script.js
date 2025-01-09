
//Função que calcula os impostos.//
function calcularImpostos(valor, taxas) {
    return taxas.map(taxa => (valor * (taxa / 100)).toFixed(2));
}


// Abaixo é o inicio da utilização do DOM e principal função de todo código.//
function gerarNotaFiscal() {
    const valorVenda = parseFloat(document.getElementById('valor-venda').value);
    const itensVendidos = document.getElementById('itens-vendidos').value;
    const taxas = [
        parseFloat(document.getElementById('irpf').value),
        parseFloat(document.getElementById('pis').value),
        parseFloat(document.getElementById('cofins').value),
        parseFloat(document.getElementById('inss').value),
        parseFloat(document.getElementById('issqn').value)
    ];

    // Validação dos campos, caso algum campo esteja vazio ou com valor inválido, será exibido um alerta.//
    if ( valorVenda <= 0 || itensVendidos === '' || taxas.some(taxa => taxa <= 0) ) {
        alert('Preencha todos os campos corretamente!');
        return;
    }

    // Formatação para moeda brasileira.//
    const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

    // Abaixo é calculado os impostos e o valor líquido da venda.//
    const [irpf, pis, cofins, inss, issqn] = calcularImpostos(valorVenda, taxas);
    const totalImpostos = (parseFloat(irpf) + parseFloat(pis) + parseFloat(cofins) + parseFloat(inss) + parseFloat(issqn));
    const valorLiquido = (valorVenda - totalImpostos);


    // Formatação dos valores.//
    const valorVendaFormatado = formatter.format(valorVenda);
    const irpfFormatado = formatter.format(irpf);
    const pisFormatado = formatter.format(pis);
    const cofinsFormatado = formatter.format(cofins);
    const inssFormatado = formatter.format(inss);
    const issqnFormatado = formatter.format(issqn);
    const totalImpostosFormatado = formatter.format(totalImpostos);
    const valorLiquidoFormatado = formatter.format(valorLiquido);


    // Const NFE, código que gera a nota fiscal, uma const que virará o innerHTML.//
    const NFE = `
        <h2>Nota Fiscal de Serviço NFS-E</h2>
        <p><strong>Valor da Venda:</strong> <strong> ${valorVendaFormatado}</strong></p>
        <p><strong>Itens Vendidos:</strong> ${itensVendidos}</p>
        <p><strong>Valores dos Impostos:</strong></p>
        <ul>
            <li>IRPF: <strong> ${irpfFormatado}</strong></li>
            <li>PIS: <strong> ${pisFormatado} </strong></li>
            <li>COFINS: <strong> ${cofinsFormatado}</strong></li>
            <li>INSS: <strong> ${inssFormatado}</strong></li>
            <li>ISSQN: <strong> ${issqnFormatado}</strong></li>
        </ul>
        <p><strong>Total pago de Impostos:</strong> <strong> ${totalImpostosFormatado}</strong></p>
        <p><strong>Valor Líquido:</strong> <strong> ${valorLiquidoFormatado}</strong></p>
    `;

    // Código que insere a const NFE no elemento com id 'nota-fiscal' e exibe a nota fiscal na tela.//
    const NotaFiscal = document.getElementById('nota-fiscal');
    NotaFiscal.innerHTML = NFE;
    NotaFiscal.style.display = 'block';
}
