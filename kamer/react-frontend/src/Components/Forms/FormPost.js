import React, {useState} from 'react'

const FormPost = ({onGet}) => {
    const [externalId, setExternalId] = useState('')
    const [areaSqm, setAreaSqm] = useState('')
    const [city, setCity] = useState('')
    const [coverImageUrl, setCoverImageUrl] = useState('')
    const [furnish, setFurnish] = useState('')
    const [longitude, setLongitude] = useState('')
    const [latitude, setLatitude] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [propertyType, setPropertyType] = useState('')
    const [rent, setRent] = useState('')
    const [title, setTitle] = useState('')
    const [additionalCost, setAdditionalCost] = useState('')
    const [deposit, setDeposit] = useState('')
    const [descriptionTranslated, setDescriptionTranslated] = useState('')
    const [gender, setGender] = useState('')
    const [pageDescription, setPageDescription] = useState('')
    const [pageTitle, setPageTitle] = useState('')
    const [pets, setPets] = useState('')
    const [roommates, setRoommates] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        onGet({
            "externalId": externalId.trim(),
            "areaSqm": areaSqm.trim(),
            "city": city.trim(),
            "coverImageUrl": coverImageUrl.trim(),
            "furnish": furnish.trim(),
            "latitude": latitude.trim(),
            "longitude": longitude.trim(),
            "postalCode": postalCode.trim(),
            "propertyType": propertyType.trim(),
            "rent": rent.trim(),
            "title": title.trim(),
            "additionalCost": additionalCost.trim(),
            "deposit": Number(deposit.trim()),
            "descriptionTranslated": descriptionTranslated.trim(),
            "gender": gender.trim(),
            "isRoomActive": true,
            "pageDescription": pageDescription.trim(),
            "pageTitle": pageTitle.trim(),
            "pets": pets.trim(),
            "roommates": roommates.trim(),
        })
    }

    return (
        <form className='form-control' onSubmit={onSubmit}>


            <label>ExternalID</label>
            <input type='text' placeholder='type ExternalID' value={externalId} onChange={(e) => {
                setExternalId(e.target.value)
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
            <input placeholder='type additionalCost' value={additionalCost} onChange={(e) => {
                setAdditionalCost(e.target.value)
            }} required={true} type="number"/>

            <label>Deposit</label>
            <input placeholder='type deposit' value={deposit} onChange={(e) => {
                setDeposit(e.target.value)
            }} required={true} type="number"/>

            <label>Description Translated</label>
            <input type='text' placeholder='type descriptionTranslated' value={descriptionTranslated} onChange={(e) => {
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


            <button type='submit'>Save Changes</button>
        </form>
    )
}

export default FormPost
