import {memo, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getProperties} from "../Property";
import {BASE_URL} from "../../App";

/**
 * @returns a form to edit the clicked property
 *
 * */
function Edit({onGet}) {
    const {externalId} = useParams(); // extracts the externalId from the url

    /* state for loading : if the api call is still getting processed */
    const [loading, setLoading] = useState(true);
    const [areaSqm, setAreaSqm] = useState('')
    const [exId, setExId] = useState(externalId);
    const [city, setCity] = useState('')
    const [coverImageUrl, setCoverImageUrl] = useState('')
    const [furnish, setFurnish] = useState('')
    const [longitude, setLongitude] = useState('')
    const [latitude, setLatitude] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [propertyType, setPropertyType] = useState('')
    const [rent, setRent] = useState('')
    const [title, setTitle] = useState('')
    const [additionalCost, setAdditionalCost] = useState('0')
    const [deposit, setDeposit] = useState('')
    const [descriptionTranslated, setDescriptionTranslated] = useState('')
    const [gender, setGender] = useState('')
    const [pageDescription, setPageDescription] = useState('')
    const [pageTitle, setPageTitle] = useState('')
    const [pets, setPets] = useState('')
    const [roommates, setRoommates] = useState('')

    const navigate = useNavigate();

    /**
     * ONCE!, get all properties of the property and set the states to them
     * */
    useEffect(async () => {
        setLoading(true);
        const {data} = await getProperties(`${BASE_URL}id/${externalId}/?format=json`);
        const prop = data[0];
        setExId(prop.externalId)
        setAreaSqm(prop.areaSqm)
        setCity(prop.city)
        setCoverImageUrl(prop.coverImageUrl)
        setFurnish(prop.furnish)
        setLatitude(prop.latitude)
        setLongitude(prop.longitude)
        setPostalCode(prop.postalCode)
        setPropertyType(prop.propertyType)
        setRent(prop.rent)
        setTitle(prop.title)
        setAdditionalCost(prop.additionalCost)
        setDeposit(prop.deposit)
        setDescriptionTranslated(prop.descriptionTranslated)
        setGender(prop.gender)
        setPageDescription(prop.pageDescription)
        setPageTitle(prop.pageTitle)
        setPets(prop.pets)
        setRoommates(prop.roommates)
        setLoading(false);
    }, []);

    /***
     * The form with the (new) info has been submitted
     * @param e event (submit)
     */
    const onSubmit = (e) => {
        setLoading(true);
        e.preventDefault()
        onGet({
            "externalId": exId,
            "areaSqm": areaSqm,
            "city": city,
            "coverImageUrl": coverImageUrl,
            "furnish": furnish,
            "latitude": latitude,
            "longitude": longitude,
            "postalCode": postalCode,
            "propertyType": propertyType,
            "rent": rent,
            "title": title,
            "additionalCost": additionalCost,
            "deposit": Number(deposit),
            "descriptionTranslated": descriptionTranslated,
            "gender": gender,
            "isRoomActive": true,
            "pageDescription": pageDescription,
            "pageTitle": pageTitle,
            "pets": pets,
            "roommates": roommates
        });
        setLoading(false);
        // redirect to the page (GET request)
        navigate(`/property/${exId}`)
    }

    return (
        <div className="container">
            {loading ? <h1>Loading...</h1> : null}
            <form className='form-control' onSubmit={onSubmit}>


                <label>Property ID</label>
                <input type='text' placeholder='type ExternalID' value={externalId} onChange={(e) => {
                    setExId(e.target.value)
                }} required={true}/>

                <label>Area Square Meter</label>
                <input placeholder='type max Area Square Meter' value={areaSqm} onChange={(e) => {
                    setAreaSqm(e.target.value)
                }} required={true} type="number"/>

                <label>City</label>
                <input type='text' placeholder='type City' value={city} onChange={(e) => {
                    setCity(e.target.value)
                }} required={true}/>
                <label>Cover Image Url</label>
                <input type='text' placeholder='type Cover Image Url' value={coverImageUrl} onChange={(e) => {
                    setCoverImageUrl(e.target.value)
                }} required={true}/>
                <label>Furnish</label>
                <input type='text' placeholder='type furnish' value={furnish} onChange={(e) => {
                    setFurnish(e.target.value)
                }} required={true}/>

                <label>Latitude</label>
                <input placeholder='type latitude' value={latitude} onChange={(e) => {
                    setLatitude(e.target.value)
                }} required={true} type="number"/>

                <label>Longitude</label>
                <input placeholder='type longitude' value={longitude} onChange={(e) => {
                    setLongitude(e.target.value)
                }} required={true} type="number"/>

                <label>Postal Code</label>
                <input type='text' placeholder='type postalCode' value={postalCode} onChange={(e) => {
                    setPostalCode(e.target.value)
                }} required={true}/>

                <label>Property Type</label>
                <input type='text' placeholder='type propertyType' value={propertyType} onChange={(e) => {
                    setPropertyType(e.target.value)

                }} required={true}/>
                <label>Rent</label>
                <input placeholder='type rent' value={rent} onChange={(e) => {
                    setRent(e.target.value)
                }} required={true} type="number"/>

                <label>Title</label>
                <input type='text' placeholder='type title' value={title} onChange={(e) => {
                    setTitle(e.target.value)
                }} required={true}/>

                <label>Additional Cost</label>
                <input type='text' placeholder='type additionalCost' value={additionalCost} onChange={(e) => {
                    setAdditionalCost(e.target.value)
                }} required={true} type="number"/>

                <label>Deposit</label>
                <input type='text' placeholder='type deposit' value={deposit} onChange={(e) => {
                    setDeposit(e.target.value)
                }} required={true} type="number"/>

                <label>Description Translated</label>
                <input type='text' placeholder='type descriptionTranslated' value={descriptionTranslated}
                       onChange={(e) => {
                           setDescriptionTranslated(e.target.value)
                       }} required={true}/>

                <label>Gender</label>
                <input type='text' placeholder='type gender' value={gender} onChange={(e) => {
                    setGender(e.target.value)
                }} required={true}/>


                <label>Page Description</label>
                <input type='text' placeholder='type pageDescription' value={pageDescription} onChange={(e) => {
                    setPageDescription(e.target.value)
                }} required={true}/>


                <label>Page Title</label>
                <input type='text' placeholder='type pageTitle' value={pageTitle} onChange={(e) => {
                    setPageTitle(e.target.value)
                }} required={true}/>


                <label>Pets</label>
                <input type='text' placeholder='type pets' value={pets} onChange={(e) => {
                    setPets(e.target.value)
                }} required={true} maxLength={3}/>


                <label>Roommates</label>
                <input placeholder='type roommates' value={roommates} onChange={(e) => {
                    setRoommates(e.target.value)
                }} required={true} type="number"/>


                <input type='submit' value='Save Changes'/>
            </form>
        </div>
    )
}


export default memo(Edit)