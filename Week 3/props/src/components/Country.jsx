import City from "./City";

function Country(props){
    console.log(props);

    return (
        <div>
            {props.countryValue}
            <City />
        </div>
    )
}

export default Country;