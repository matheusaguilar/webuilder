export class DeviceLook{

    private deviceTypes = ['desktop', 'tablet', 'phone'];

    swithDeviceLook(device: string) {
        switch (device) {
            case "desktop":
                return "1280px";
    
            case "tablet":
                return "719px";
    
            case "phone":
                return "360px";
            
            default:
                return "1280px";
        }
    }

    getDeviceSelected(device: string){
        switch (device) {
            case "1280px":
                return "desktop";
    
            case "719px":
                return "tablet";
    
            case "360px":
                return "phone";
            
            default:
                return "desktop";
        }
    }

    next(device: string){
        let index = this.deviceTypes.indexOf(device);
        index++;
        if (index >= this.deviceTypes.length){
            index = 0;
        }
        return this.swithDeviceLook(this.deviceTypes[index]);
    }

    prev(device: string){
        let index = this.deviceTypes.indexOf(device);
        index--;
        if (index < 0){
            index = this.deviceTypes.length - 1;
        }
        return this.swithDeviceLook(this.deviceTypes[index]);
    }

}