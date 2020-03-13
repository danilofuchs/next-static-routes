import Page from "../../components/pages/HomePage";
import { NextPage } from "next";
import { IntlProvider } from "react-intl";
const locale = "pt";

const messages = {
    pt: {
        a: "oi",
    },
    es: {
        a: "Arriba!",
    },
};

const WrappedPage: NextPage = () => {
    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            <Page />
        </IntlProvider>
    );
};

export default WrappedPage;
