import React from 'react'

const FormPost = ({onGet}) => {
    const [externalId, setexternalId] = React.useState('')
    const [areaSqm, setAreaSqm] = React.useState('')
    const [city, setCity] = React.useState('')
    const [coverImageUrl, setCoverImageUrl] = React.useState('')
    const [furnish, setFurnish] = React.useState('')
    const [longitude, setLongitude] = React.useState('')
    const [latitude, setLatitude] = React.useState('')
    const [postalCode, setPostalCode] = React.useState('')
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
    }

    return (
        <form className='form-control' onSubmit={onSubmit}>

        externalId
        areaSqm
        city
        coverImageUrl
        furnish
        latitude
        longitude
        postalCode
        propertyType
        rent
        title
        additionalCost
        deposit
        descriptionTranslated
        gender
        isRoomActive
        pageDescription
        pageTitle
        pets
        roommates


            <label>ExternalID</label>
            <input type='text' placeholder='type ExternalID' value={externalID} onChange={(e) =>{
                setExternalID(e.target.value)
            }}></input>

            <label>Area Square Meter</label>
            <input type='text' placeholder='type max Area Square Meter' value={areaSqm} onChange={(e) =>{
                setAreaSqm(e.target.value)
            }}></input>

            <label>City</label>
            <input type='text' placeholder='type City' value={city} onChange={(e) =>{
                setCity(e.target.value)
            }}></input>
            <label>Cover Image Url</label>
            <input type='text' placeholder='type Cover Image Url' value={coverImageUrl} onChange={(e) =>{
                setCoverImageUrl(e.target.value)
            }}></input>
            <label>Furnish</label>
            <input type='text' placeholder='type furnish' value={city} onChange={(e) =>{
                setFurnish(e.target.value)
            }}></input>

            <label>Latitude</label>
            <input type='text' placeholder='type latitude' value={latitude} onChange={(e) =>{
                setLatitude(e.target.value)
            }}></input>

            <label>Longitude</label>
            <input type='text' placeholder='type longitude' value={longitude} onChange={(e) =>{
                setLongitude(e.target.value)
            }}></input>

            <label>Postal Code</label>
            <input type='text' placeholder='type postalCode' value={postalCode} onChange={(e) =>{
                setPostalCode(e.target.value)
            }}></input>
            
            <label>Property Type</label>
            <input type='text' placeholder='type propertyType' value={propertyType} onChange={(e) =>{
                setPropertyType(e.target.value)

            }}></input>
            <label>Rent</label>
            <input type='text' placeholder='type rent' value={rent} onChange={(e) =>{
                setRent(e.target.value)
            }}></input>

            <label>Title</label>
            <input type='text' placeholder='type title' value={title} onChange={(e) =>{
                setTitle(e.target.value)
            }}></input>

            <label>Additional Cost</label>
            <input type='text' placeholder='type additionalCost' value={additionalCost} onChange={(e) =>{
                setAdditionalCost(e.target.value)
            }}></input>

            <label>Deposit</label>
            <input type='text' placeholder='type deposit' value={deposit} onChange={(e) =>{
                setDeposit(e.target.value)
            }}></input>

            <label>Description Translated</label>
            <input type='text' placeholder='type descriptionTranslated' value={descriptionTranslated} onChange={(e) =>{
                setDescriptionTranslated(e.target.value)
            }}></input>

            <label>Gender</label>
            <input type='text' placeholder='type gender' value={gender} onChange={(e) =>{
                setGender(e.target.value)
            }}></input>

            <label>isRoomActive</label>
            <input type='text' placeholder='type isRoomActive' value={isRoomActive} onChange={(e) =>{
                setIsRoomActive(e.target.value)
            }}></input>


            <label>Page Description</label>
            <input type='text' placeholder='type pageDescription' value={pageDescription} onChange={(e) =>{
                setPageDescription(e.target.value)
            }}></input>


            <label>Page Title</label>
            <input type='text' placeholder='type pageTitle' value={pageTitle} onChange={(e) =>{
                setPageTitle(e.target.value)
            }}></input>


            <label>Pets</label>
            <input type='text' placeholder='type pets' value={pets} onChange={(e) =>{
                setPets(e.target.value)
            }}></input>


            <label>Roommates</label>
            <input type='text' placeholder='type roommates' value={roommates} onChange={(e) =>{
                setRoommates(e.target.value)
            }}></input>



            <input type='submit' value='Find Property'></input>
        </form>
    )
}

export default FormPost
