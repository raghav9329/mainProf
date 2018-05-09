class PixelData {
    constructor() {
        this.mxptint   = 'img src="https://mpp.mxptint.net/2/25280/?rnd=%n" width="0" height="0" style="display:none"';
        this.fls       = 'iframe src="https://8150057.fls.doubleclick.net/activityi;src=8150057;type=thank0;cat=ddcat0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=1?"'
        this.ddm       = 'img src="https://ad.doubleclick.net/ddm/activity/src=3044623;type=dg;cat=enrol000;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=1?"';
        this.facebook  = 'src="https://www.facebook.com/tr?id=114348872586517';

        // Add a pixel for Receipts Page - Cell # 12-I in "New" sheet
        // Add a pixel on Personal Info Page - Cell # 11-I in "New" sheet

        this.pInfo1    = 'src="https://secure.adnxs.com/seg?add'
        // Add 2 pixels on Plan Options Page - Cell 8-I and 10-I in "New" sheet
        this.pOptions1 = 'img src="https://secure.adnxs.com/px?id=';
        this.pOptions2 = 'https://ad.doubleclick.net/ddm/activity/src='

        // Shounak, 04.10.2018: the below pixel will go on Get A Quotes Page
        // Secure Accordant Pixel
        // @Naresh: Please add the validation for this in respective method
        this.secureAccordant = 'https://secure.adnxs.com/seg?add'
    }
}

module.exports = new PixelData();