
const createOTAHotelResNotifRQ = (reservationData) => {
    const timestamp = new Date().toISOString();

    const message = `
        <OTA_HotelResNotifRQ EchoToken="uniqueEchoToken" TimeStamp="${timestamp}" Version="1.0">
            <HotelReservations>
                <HotelReservation ResStatus="${reservationData.resStatus}" CreateDateTime="${reservationData.createDateTime}" CreatorID="${reservationData.creatorID}" LastModifyDateTime="${reservationData.lastModifyDateTime}" LastModifierID="${reservationData.lastModifierID}">
                    <POS>
                        <Source>
                            <RequestorID ID="${reservationData.requestorID}" />
                            <BookingChannel Type="${reservationData.bookingChannelType}" Primary="${reservationData.primary}" />
                            <CompanyName Code="${reservationData.companyCode}">${reservationData.companyName}</CompanyName>
                        </Source>
                    </POS>
                    <UniqueID ID="${reservationData.uniqueID}" />
                </HotelReservation>
            </HotelReservations>
        </OTA_HotelResNotifRQ>
    `;

    return message;
};

module.exports = {
    createOTAHotelResNotifRQ
};