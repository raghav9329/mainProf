class PixelData {
    constructor() {
        this.mxptint              = 'img src="https://mpp.mxptint.net/2/25280/?rnd=%n" width="0" height="0" style="display:none"';
        this.fls                  = 'iframe src="https://8150057.fls.doubleclick.net/activityi;src=8150057;type=thank0;cat=ddcat0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=1?"'
        this.ddm                  = 'img src="https://ad.doubleclick.net/ddm/activity/src=3044623;type=dg;cat=enrol000;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=1?"';
        this.facebook             = 'src="https://www.facebook.com/tr?id=114348872586517';

        // Add a pixel for Receipts Page - Cell # 12-I in "New" sheet
        // Add a pixel on Personal Info Page - Cell # 11-I in "New" sheet
        this.floodlight_getaquote = 'https://8150057.fls.doubleclick.net/activityi;src=8150057';
        this.vendor_getaquote     = 'https://mpp.mxptint.net/2/28544/?rnd=%n';

        this.pInfo1               = 'src="https://secure.adnxs.com/seg?add'

        // Add 2 pixels on Plan Options Page - Cell 8-I and 10-I in "New" sheet
        this.pOptions1            = 'img src="https://secure.adnxs.com/px?id=';
        this.pOptions2            = 'https://ad.doubleclick.net/ddm/activity/src='

        // Personal info page
        this.floodlight_perInfo   = 'https://8150057.fls.doubleclick.net/activityi;src=8150057';
        this.vendor_perInfo       = 'https://mpp.mxptint.net/2/28545/?rnd=%n';

        // Receipt page

        this.floodlight_receipt   = 'https://8150057.fls.doubleclick.net/activityi;src=8150057';
        this.vendor_receipt       = 'https://mpp.mxptint.net/2/28546/?rnd=%n';
       //
        this.secureAccordant      = 'https://secure.adnxs.com/seg?add'
    }
}

module.exports = new PixelData();