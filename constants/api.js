import axios from "axios";

export default {
    login : function(objUser){
        return axios.post("http://www.medmonitor.io/api/user/login", objUser)
    },
    findUserByUsername : function(){
        return axios.get('http://www.medmonitor.io/api/user/existingUsername/john');
    },
    findPatientInfoForPatient: function(id){
        return axios.get("http://www.medmonitor.io/api/patient/forPatient/"+id);
    },
}