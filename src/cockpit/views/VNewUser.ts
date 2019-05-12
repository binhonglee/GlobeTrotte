import { Component, Vue } from 'vue-property-decorator';
import { WingsStructUtil } from 'wings-ts-util';
import HTTPReq from '../shared/HTTPReq';
import NewUser from '../structs/NewUser';

@Component({
    data() {
        return {
            email: '',
            password: '',
            confPassword: '',
        };
    },
})

export default class VNewUser extends Vue {
    private confirm(): void {
        if (this.$data.password.localeCompare(this.$data.confPassword)) {
            alert('Password does not match.');
            return;
        }

        const newUser = new NewUser();
        newUser.register({
            email: this.$data.email,
            password: this.$data.password,
        });

        HTTPReq.post(
            'user',
            WingsStructUtil.stringify(newUser),
            (returnedUser: string) => {
                // console.log(JSON.parse(returnedUser));
            },
        );
    }

    private cancel(): void {
        this.$router.back();
    }
}
