<template>
    <div>
        <div class="notification is-info">
            <h1>Viewing records from VUEX store</h1>
        </div>
       <users :userResult="users" :rolesLoaded="rolesLoaded"/>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Users from '@/components/Users';

export default {
    mounted () {
        console.log('Dispatching action to get users');
        this.loadUsers(0, 12);
    },
    components: {
        Users,
    },
    computed: {
        ...mapGetters({
            users: 'users/getUsers',
            rolesLoaded: 'users/rolesLoaded',
        }),
    },
    methods: {
        ...mapActions({
            loadUsers: 'users/users',
        }),
    },
};
</script>
<style lang="scss" scoped>
    div.notification {
        width: 400px;
    }
</style>
