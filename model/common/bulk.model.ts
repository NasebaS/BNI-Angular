
import { URL } from "src/utils/app-enum";
import { Service } from "./service.model";
export class Bulk {
    member_id: number;
    member_name: string;
    email_id:  string;
    mobile_no:  string;
    alternate_number:  string;
    address:  string;
    company_name: string;
    industry_type: string;
    image_path:  string;
    status:  string;
    app_start_date:  string;
    created_by:  string;
    created_at:  string;
    modified_by:  string;
    modified_at:  string;
    

    static getUnattendedMemberList(response): Bulk[] {
        let memberResponse = response.memberList;
        var members: Bulk[] = [];

        memberResponse.forEach(memberData => {
            let member = new Bulk();
            member.member_id = memberData.member_id;
            member.member_name = memberData.member_name;
            member.email_id = memberData.email_id;
            member.mobile_no = memberData.mobile_no;
            member.alternate_number = memberData.alternate_number;
            member.address = memberData.address;
            member.company_name = memberData.company_name;
            member.industry_type = memberData.industry_type;
            member.image_path = URL.ImageURL+memberData.image_path;
            member.status = memberData.status;
            member.app_start_date = memberData.app_start_date;
            member.created_by = memberData.created_by;
            member.created_at = memberData.created_at;
            member.modified_by = memberData.modified_by;
            member.modified_at = memberData.modified_at;
            members.push(member);
        });
        return members;
    }
}



