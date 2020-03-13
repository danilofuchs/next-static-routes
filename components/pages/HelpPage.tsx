export interface Props {
    locale: string;
}
export default function HelpPage(props: Props) {
    return (
        <>
            <div>{props.locale}</div>
            <div>Ajuda!</div>
        </>
    );
}
