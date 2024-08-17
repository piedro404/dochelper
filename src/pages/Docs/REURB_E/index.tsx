import { useState, FormEvent } from "react";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { saveAs } from "file-saver";
import InputMask from "react-input-mask";

const daysInText = [
    "PRIMEIRO",
    "SEGUNDO",
    "TERCEIRO",
    "QUARTO",
    "QUINTO",
    "SEXTO",
    "SÉTIMO",
    "OITAVO",
    "NONO",
    "DÉCIMO",
    "DÉCIMO PRIMEIRO",
    "DÉCIMO SEGUNDO",
    "DÉCIMO TERCEIRO",
    "DÉCIMO QUARTO",
    "DÉCIMO QUINTO",
    "DÉCIMO SEXTO",
    "DÉCIMO SÉTIMO",
    "DÉCIMO OITAVO",
    "DÉCIMO NONO",
    "VIGÉSIMO",
    "VIGÉSIMO PRIMEIRO",
    "VIGÉSIMO SEGUNDO",
    "VIGÉSIMO TERCEIRO",
    "VIGÉSIMO QUARTO",
    "VIGÉSIMO QUINTO",
    "VIGÉSIMO SEXTO",
    "VIGÉSIMO SÉTIMO",
    "VIGÉSIMO OITAVO",
    "VIGÉSIMO NONO",
    "TRIGÉSIMO",
    "TRIGÉSIMO PRIMEIRO",
];

const monthsInText = [
    "JANEIRO",
    "FEVEREIRO",
    "MARÇO",
    "ABRIL",
    "MAIO",
    "JUNHO",
    "JULHO",
    "AGOSTO",
    "SETEMBRO",
    "OUTUBRO",
    "NOVEMBRO",
    "DEZEMBRO",
];

const convertYearToText = (year: any) => {
    const units = [
        "",
        "UM",
        "DOIS",
        "TRÊS",
        "QUATRO",
        "CINCO",
        "SEIS",
        "SETE",
        "OITO",
        "NOVE",
    ];
    const tens = [
        "",
        "DEZ",
        "VINTE",
        "TRINTA",
        "QUARENTA",
        "CINQUENTA",
        "SESSENTA",
        "SETENTA",
        "OITENTA",
        "NOVENTA",
    ];
    const hundreds = [
        "",
        "CEM",
        "DUZENTOS",
        "TREZENTOS",
        "QUATROCENTOS",
        "QUINHENTOS",
        "SEISCENTOS",
        "SETECENTOS",
        "OITOCENTOS",
        "NOVECENTOS",
    ];
    const thousands = ["", "MIL", "DOIS MIL"];

    const yearStr = year.toString();
    const thousandPart = thousands[parseInt(yearStr[0])];
    const hundredPart = hundreds[parseInt(yearStr[1])];
    const tenPart = tens[parseInt(yearStr[2])];
    const unitPart = units[parseInt(yearStr[3])];

    var yearInText = `${thousandPart}`;
    if (hundredPart) yearInText += ` E ${hundredPart}`;
    if (tenPart || unitPart) yearInText += ` E ${tenPart} ${unitPart}`;

    return yearInText;
};

const dataInInt = (dateString: any) => {
    const data = dateString.split("-");

    return [parseInt(data[0]), parseInt(data[1]), parseInt(data[2])]
}

const formatDate = (dateString: any, monthAdd: any = 0) => {
    var [year, month, day] = dataInInt(dateString);
    month += monthAdd;
    const formattedDay = day.toString().padStart(2, "0");
    const formattedMonth = month.toString().padStart(2, "0");

    return `${formattedDay}/${formattedMonth}/${year}`;
};

const formatDateText = (dateString: any) => {
    var [year, month, day] = dataInInt(dateString);
    const formattedDay = day.toString().padStart(2, "0");

    return `${formattedDay} de ${monthsInText[month]} de ${year}`;
};

const formatDateTextDialogo = (dateString: any) => {
    var [year, month, day] = dataInInt(dateString);

    return `Ao ${daysInText[day - 1]} dia do mês de ${
        monthsInText[month]
    } do ano de ${convertYearToText(year)}`;
};

const generateModifiedDoc = (formData: any, templateUrl: any) => {
    const updatedFormData = {
        ...formData,
        data: formatDateText(formData.data),
        dataEmissao: formatDate(formData.dataEmissao),
        dataPorExtenso: formatDateTextDialogo(formData.data),
        dataVencimento: formatDate(formData.dataEmissao, 1),
    };

    return fetch(templateUrl)
        .then((response) => response.arrayBuffer())
        .then((content) => {
            const zip = new PizZip(content);
            const doc = new Docxtemplater(zip, {
                paragraphLoop: true,
                linebreaks: true,
            });
            doc.setData(updatedFormData);
            doc.render();
            return doc.getZip().generate({ type: "blob" });
        });
};

export function REURB_E() {
    const [formData, setFormData] = useState({
        profile: "",
        descricaoPerimetro: "",
        data: "",
        assinatura: "",
        cpf: "",
        localizacao: "",
        dataEmissao: "",
        statusCertidao: "",
        number: "",
        rua: "",
        referencia1: "",
        perimetro1: "",
        referencia2: "",
        perimetro2: "",
        referencia3: "",
        perimetro3: "",
        referencia4: "",
        perimetro4: "",
        areaTotal: "",
        perimetroTotal: "",
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        var newValue = value;
        if (name === "assinatura" || name === "statusCertidao") {
            newValue = value.toUpperCase();
        }
        setFormData({
            ...formData,
            [name]: newValue,
        });
    };

    const handleDownload = (e: FormEvent) => {
        e.preventDefault();

        generateModifiedDoc(formData, "./doc-models/reurb_e.docx")
            .then((blob) =>
                saveAs(
                    blob,
                    `reurb_e-${formData.data}_${formData.assinatura}.docx`
                )
            )
            .catch((error) =>
                console.error("Erro ao baixar documento:", error)
            );
    };

    return (
        <section className="flex flex-1 flex-col gap-4 p-4 w-full">
            <section className="bg-gray-100">
                <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-x-16 gap-y-8">
                        <div className="rounded-lg bg-white p-8 shadow-lg lg:p-12">
                            <h1 className="text-center text-2xl pb-4">
                                REURB'E.docx
                            </h1>
                            <form
                                onSubmit={handleDownload}
                                className="space-y-4"
                            >
                                <div>
                                    <label htmlFor="profile">
                                        Perfil Apresentado
                                    </label>
                                    <textarea
                                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                        required
                                        placeholder="Ex: Pedro Henrique Martins Borges, brasileiro, maior, solteiro, portador do CPF: n° 123.456.789-10 e RG: n° 543212345678-9, residente e domiciliada na José do Egito, n° 62, Bairro Centro, nesta cidade"
                                        rows={3}
                                        name="profile"
                                        id="profile"
                                        value={formData.profile}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>

                                <div>
                                    <label htmlFor="descricaoPerimetro">
                                        Descrição do Perimetro
                                    </label>
                                    <textarea
                                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                        required
                                        placeholder="Ex: 177,10 m² (cento e setenta e sete metros e dez centímetros quadrados), perímetro total de 64,60 m (sessenta e quanto metros e sessenta centímetros), sendo: 7,00 m (sete metros), de frente para Rua 5 de Setembro; com 25,30 m (vinte e cinco metros e trinta centímetros) do lado direito, limitando – se com Maria de Lourdes Ferreira da Silva; 25,30 m (vinte e cinco metros e trinta centímetros) do lado esquerdo, limitando – se com Edinar Pereira Barros e Valdson Rodrigues Lima; e 7,00 m (sete metros) na linha de fundos, limitando – se com Cristiane Alves de Brito"
                                        rows={5}
                                        name="descricaoPerimetro"
                                        id="descricaoPerimetro"
                                        value={formData.descricaoPerimetro}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <div>
                                        <label htmlFor="cpf">CPF</label>
                                        <InputMask
                                            mask="999.999.999-99"
                                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                            required
                                            placeholder="Ex: 000.000.000-00"
                                            type="text"
                                            name="cpf"
                                            id="cpf"
                                            value={formData.cpf}
                                            onChange={handleChange}
                                        ></InputMask>
                                    </div>

                                    <div>
                                        <label htmlFor="dataEmissao">
                                            Data de Emissão
                                        </label>

                                        <input
                                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                            required
                                            type="date"
                                            id="dataEmissao"
                                            name="dataEmissao"
                                            value={formData.dataEmissao}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="data">Data</label>

                                        <input
                                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                            required
                                            type="date"
                                            id="data"
                                            name="data"
                                            value={formData.data}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="localizacao">
                                            Localização
                                        </label>
                                        <input
                                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                            required
                                            placeholder="Ex: Rua 5 de Setembro, s/n, Bairro Conceição"
                                            type="text"
                                            name="localizacao"
                                            id="localizacao"
                                            value={formData.localizacao}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="statusCertidao">
                                            Status do Certificado
                                        </label>

                                        <input
                                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                            required
                                            type="text"
                                            placeholder="NEGATIVA"
                                            name="statusCertidao"
                                            id="statusCertidao"
                                            value={formData.statusCertidao}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="assinatura">
                                        Assinatura
                                    </label>

                                    <input
                                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                        required
                                        placeholder="Ex: PEDRO HENRIQUE MARTINS BORGES"
                                        type="text"
                                        name="assinatura"
                                        value={formData.assinatura}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="number">
                                        Numero do Processo º
                                    </label>

                                    <input
                                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                        required
                                        placeholder="Ex: 227º"
                                        type="number"
                                        name="number"
                                        value={formData.number}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="rua">Rua</label>
                                    <input
                                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                        required
                                        placeholder="Ex: 5 de Setembro"
                                        type="text"
                                        name="rua"
                                        id="rua"
                                        value={formData.rua}
                                        onChange={handleChange}
                                    />
                                </div>

                                <h3 className="text-center">Ponto 1</h3>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="referencia1">
                                            Referencia
                                        </label>
                                        <input
                                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                            required
                                            placeholder="Ex: Rua 5 de Setembro"
                                            type="text"
                                            name="referencia1"
                                            id="referencia1"
                                            value={formData.referencia1}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="perimetro1">
                                            Perimetro
                                        </label>
                                        <input
                                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                            required
                                            placeholder="Ex: 7,00 m"
                                            type="text"
                                            name="perimetro1"
                                            id="perimetro1"
                                            value={formData.perimetro1}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <h3 className="text-center">Ponto 2</h3>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="referencia2">
                                            Referencia
                                        </label>
                                        <input
                                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                            required
                                            placeholder="Ex: Rua 5 de Setembro"
                                            type="text"
                                            name="referencia2"
                                            id="referencia2"
                                            value={formData.referencia2}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="perimetro2">
                                            Perimetro
                                        </label>
                                        <input
                                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                            required
                                            placeholder="Ex: 7,00 m"
                                            type="text"
                                            name="perimetro2"
                                            id="perimetro2"
                                            value={formData.perimetro2}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <h3 className="text-center">Ponto 3</h3>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="referencia3">
                                            Referencia
                                        </label>
                                        <input
                                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                            required
                                            placeholder="Ex: Rua 5 de Setembro"
                                            type="text"
                                            name="referencia3"
                                            id="referencia3"
                                            value={formData.referencia3}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="perimetro3">
                                            Perimetro
                                        </label>
                                        <input
                                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                            required
                                            placeholder="Ex: 7,00 m"
                                            type="text"
                                            name="perimetro3"
                                            id="perimetro3"
                                            value={formData.perimetro3}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <h3 className="text-center">Ponto 4</h3>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="referencia4">
                                            Referencia
                                        </label>
                                        <input
                                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                            required
                                            placeholder="Ex: Rua 5 de Setembro"
                                            type="text"
                                            name="referencia4"
                                            id="referencia4"
                                            value={formData.referencia4}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="perimetro4">
                                            Perimetro
                                        </label>
                                        <input
                                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                            required
                                            placeholder="Ex: 7,00 m"
                                            type="text"
                                            name="perimetro4"
                                            id="perimetro4"
                                            value={formData.perimetro4}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <h3 className="text-center">Total</h3>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="areaTotal">
                                            Área Total
                                        </label>
                                        <input
                                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                            required
                                            placeholder="Ex: 177,1 m² (cento e setenta e sete metros e dez centímetros quadrados)"
                                            type="text"
                                            name="areaTotal"
                                            id="areaTotal"
                                            value={formData.areaTotal}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="perimetroTotal">
                                            Perimetro Total
                                        </label>
                                        <input
                                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                            required
                                            placeholder="Ex: 64,6 m (sessenta e quatro metros e sessenta centímetros)"
                                            type="text"
                                            name="perimetroTotal"
                                            id="perimetroTotal"
                                            value={formData.perimetroTotal}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="inline-block w-full rounded-lg bg-green-500 px-5 py-3 font-medium text-white"
                                    >
                                        Baixar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
}
