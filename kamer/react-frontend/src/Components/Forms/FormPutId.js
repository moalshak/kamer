import React from 'react'

const FormPutId = ({onGet}) => {
    const [externalId, setExternalId] = React.useState('')
    const [areaSqm, setAreaSqm] = React.useState('')
    const [city, setCity] = React.useState('')
    const [coverImageUrl, setCoverImageUrl] = React.useState('')
    const [furnish, setFurnish] = React.useState('')
    const [longitude, setLongitude] = React.useState('')
    const [latitude, setLatitude] = React.useState('')
    const [postalCode, setPostalCode] = React.useState('')
    const [propertyType, setPropertyType] = React.useState('')
    const [rent, setRent] = React.useState('')
    const [title, setTitle] = React.useState('')
    const [additionalCost, setAdditionalCost] = React.useState('')
    const [deposit, setDeposit] = React.useState('')
    const [descriptionTranslated, setDescriptionTranslated] = React.useState('')
    const [gender, setGender] = React.useState('')
    const [isRoomActive, setIsRoomActive] = React.useState('')
    const [pageDescription, setPageDescription] = React.useState('')
    const [pageTitle, setPageTitle] = React.useState('')
    const [pets, setPets] = React.useState('')
    const [roommates, setRoommates] = React.useState('')
 
    const onSubmit = (e) => {
        e.preventDefault()
        onGet({"externalId": externalId, "areaSqm": areaSqm, "city": city, "coverImageUrl": coverImageUrl, "furnish": furnish, "latitude": latitude,
            "longitude": longitude, "postalCode": postalCode, "propertyType": propertyType, "rent": rent, "title": title, "additionalCost": additionalCost,
            "deposit": Number(deposit), "descriptionTranslated": descriptionTranslated, "gender": gender, "isRoomActive": true, "pageDescription":pageDescription,
            "pageTitle": pageTitle, "pets": pets, "roommates":roommates})
    }

    return (
        <form className='form-control' onSubmit={onSubmit}>
            


            <label>ExternalID</label>
            <input type='text' placeholder='type ExternalID' value={externalId} onChange={(e) => {
    setExternalId(e.target.value)
}}required={true}/>

            <label>Area Square Meter</label>
            <input type='text' placeholder='type max Area Square Meter' value={areaSqm} onChange={(e) => {
    setAreaSqm(e.target.value)
}}required={true} type = {Number}/>

            <label>City</label>
            <input type='text' placeholder='type City' value={city} onChange={(e) => {
    setCity(e.target.value)
}}required={true}/>
            <label>Cover Image Url</label>
            <input type='text' placeholder='type Cover Image Url' value={coverImageUrl} onChange={(e) => {
    setCoverImageUrl(e.target.value)
}}required={true}/>
            <label>Furnish</label>
            <input type='text' placeholder='type furnish' value={furnish} onChange={(e) => {
    setFurnish(e.target.value)
}}required={true}/>

            <label>Latitude</label>
            <input type='text' placeholder='type latitude' value={latitude} onChange={(e) => {
    setLatitude(e.target.value)
}}required={true} type = {Number}/>

            <label>Longitude</label>
            <input type='text' placeholder='type longitude' value={longitude} onChange={(e) => {
    setLongitude(e.target.value)
}}required={true} type = {Number}/>

            <label>Postal Code</label>
            <input type='text' placeholder='type postalCode' value={postalCode} onChange={(e) => {
    setPostalCode(e.target.value)
}}required={true}/>
            
            <label>Property Type</label>
            <input type='text' placeholder='type propertyType' value={propertyType} onChange={(e) => {
    setPropertyType(e.target.value)

}}required={true}/>
            <label>Rent</label>
            <input type='text' placeholder='type rent' value={rent} onChange={(e) => {
    setRent(e.target.value)
}}required={true} type = {Number}/>

            <label>Title</label>
            <input type='text' placeholder='type title' value={title} onChange={(e) => {
    setTitle(e.target.value)
}}required={true}/>

            <label>Additional Cost</label>
            <input type='text' placeholder='type additionalCost' value={additionalCost} onChange={(e) => {
    setAdditionalCost(e.target.value)
}}required={true} type = {Number}/>

            <label>Deposit</label>
            <input type='text' placeholder='type deposit' value={deposit} onChange={(e) => {
    setDeposit(e.target.value)
}}required={true} type = {Number}/>

            <label>Description Translated</label>
            <input type='text' placeholder='type descriptionTranslated' value={descriptionTranslated} onChange={(e) => {
    setDescriptionTranslated(e.target.value)
}}required={true}/>

            <label>Gender</label>
            <input type='text' placeholder='type gender' value={gender} onChange={(e) => {
    setGender(e.target.value)
}}required={true}/>


            <label>Page Description</label>
            <input type='text' placeholder='type pageDescription' value={pageDescription} onChange={(e) => {
    setPageDescription(e.target.value)
}}required={true}/>


            <label>Page Title</label>
            <input type='text' placeholder='type pageTitle' value={pageTitle} onChange={(e) => {
    setPageTitle(e.target.value)
}}required={true}/>


            <label>Pets</label>
            <input type='text' placeholder='type pets' value={pets} onChange={(e) => {
    setPets(e.target.value)
}}required={true}/>


            <label>Roommates</label>
            <input type='text' placeholder='type roommates' value={roommates} onChange={(e) => {
    setRoommates(e.target.value)
}}required={true} type = {Number}/>



            <input type='submit' value='Saves Changes'/>
        </form>
    )
}

export default FormPutId
