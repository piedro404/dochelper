import React, { useState, FormEvent } from "react";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { saveAs } from "file-saver";

const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    const formattedDay = day.padStart(2, '0');
    const formattedMonth = month.padStart(2, '0');
    
    return `${formattedDay}/${formattedMonth}/${year}`;
};

const generateModifiedDoc = (formData, templateUrl) => {
    const updatedFormData = {
        ...formData,
        data: formatDate(formData.data)
    };

    return fetch(templateUrl)
        .then(response => response.arrayBuffer())
        .then(content => {
            const zip = new PizZip(content);
            const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
            doc.setData(updatedFormData);
            doc.render();
            return doc.getZip().generate({ type: "blob" });
        });
};

export function CertidaoDeRegularizacao() {
    const [formData, setFormData] = useState({
        number: "",
        profile: "",
        nucleo: "",
        rua: "",
        bairro: "",
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
        data: "",
        assinatura: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = value;
        if(name === "assinatura") {
            const newValue = value.toUpperCase();
        }
        setFormData({
            ...formData,
            [name]: newValue,
        });
    };

    const handleDownload = (e: FormEvent) => {
        e.preventDefault();

        generateModifiedDoc(formData, "./doc-models/certidao-de-regularizacao.docx")
            .then(blob => saveAs(blob, `certidao-de-regularizacao-${formData.number}_${formData.assinatura}.docx`))
            .catch(error => console.error("Erro ao baixar documento:", error));
    };

    return (
        <section className="flex flex-1 flex-col gap-4 p-4 w-full">
            <section className="bg-gray-100">
                <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-x-16 gap-y-8">
                        <div className="rounded-lg bg-white p-8 shadow-lg lg:p-12">
                            <h1 className="text-center text-2xl pb-4">Certidao De Regularizacao.docx</h1>
                            <form onSubmit={handleDownload} className="space-y-4">
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

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <div>
                                        <label htmlFor="nucleo">Núcleo</label>
                                        <input
                                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                            required
                                            placeholder="Ex: Conceição"
                                            type="text"
                                            name="nucleo"
                                            id="nucleo"
                                            value={formData.nucleo}
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

                                    <div>
                                        <label htmlFor="bairro">Bairro</label>
                                        <input
                                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                            required
                                            placeholder="Ex: Centro"
                                            type="text"
                                            name="bairro"
                                            id="bairro"
                                            value={formData.bairro}
                                            onChange={handleChange}
                                        />
                                    </div>
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

                                <div>
                                    <label htmlFor="Data">Data</label>

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
