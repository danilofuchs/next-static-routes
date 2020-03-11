import { GetStaticProps } from "next";

interface Props {
    static: string;
}
export default function StaticPage(props: Props) {
    console.log(props);
    return <div>This is static {props.static}</div>;
}

export const getStaticProps: GetStaticProps = async () => {
    console.log("generating");
    return {
        props: {
            static: "as",
        },
    };
};
