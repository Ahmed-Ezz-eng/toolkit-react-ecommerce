
import { toast } from 'react-toastify';

const useNotification = () => {
    const notify = (msg, type) => {
        switch(type){
            case "success":
                toast.success(msg, {autoClose: 3000});
                break;
            case "warning":
                toast.warning(msg, {autoClose: 3000});
                break;
            default:
                toast.error(msg, {autoClose: 3000});
                break;
        }
    };
    return [notify];
}

export default useNotification;