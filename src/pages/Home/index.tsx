import { BtnSelectDoc } from "../../components/btnSelectDoc";

export function Home() {
    return (
            <section className="flex flex-1 flex-col gap-4 p-4 w-full max-w-3xl box-border">
                <BtnSelectDoc
                    url="certidao-de-regularizacao"
                    text="Certidão de Regularização"
                />
                <BtnSelectDoc url="reurb-e" text="REURB'E" />
            </section>
    );
}
