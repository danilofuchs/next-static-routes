import { GetStaticProps, GetStaticPaths } from "next";
import { IntlProvider, FormattedMessage } from "react-intl";
import Link from "next/link";

interface Props {
    messages: { [x: string]: string };
    locale: string;
}
export default function StaticPage(props: Props) {
    const otherLocale = props.locale === "pt" ? "es" : "pt";
    return (
        <IntlProvider locale={props.locale} messages={props.messages}>
            <div>{props.locale}</div>
            <br />
            <FormattedMessage id="my.test.string" />
            <br />
            <Link href="/[locale]/react-intl" as={`/${otherLocale}/react-intl`}>
                <button>{otherLocale}</button>
            </Link>
        </IntlProvider>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            {
                params: {
                    locale: "pt",
                },
            },
            {
                params: {
                    locale: "es",
                },
            },
        ],
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const paramLocale = context.params?.locale;
    const locale = isLocale(paramLocale) ? paramLocale : "pt";

    return {
        props: {
            messages: messages[locale],
            locale,
        },
    };
};

const messages = {
    pt: {
        "my.test.string": "oi",
    },
    es: {
        "my.test.string": "Arriba!",
    },
};

type Locale = keyof typeof messages;

const isLocale = (locale: any): locale is Locale => {
    return locale in messages;
};
