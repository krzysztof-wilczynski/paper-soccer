<template>
  <div class="q-pa-lg q-mx-md card" style="max-width: 600px">
    <q-form @submit.prevent.stop="onLogin"
            autofocus
            class="q-gutter-md">
      <q-input filled v-model="credentials.login" label="Login" lazy-rules
               ref="loginRef"
               :rules="stringRules">
        <template #prepend>
          <q-icon name="mdi-account"/>
        </template>
      </q-input>
      <q-input filled :type="isPassword ? 'password' : 'text'" v-model="credentials.password" label="Hasło"
               ref="passwordRef"
               lazy-rules
               :rules="stringRules"/>
      <div>
        <q-btn label="Zaloguj" class="full-width" type="submit" color="primary"/>
      </div>
    </q-form>
    {{ errors.join() }}
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {LoginUser} from 'src/api/endpoints'
import {LoginCredentials, LoginCredentialsResponse} from './models';
import {reactive} from 'vue';

const credentials = reactive<LoginCredentials>({login: '', password: ''})

const errors = ref([])
// const isValid = ref(false)
const isPassword = ref(true)

const router = useRouter()

const stringRules = [
  (val: string) => (!!val && val.length > 6) || 'Podaj hasło'
]

const onLogin = async () => {
  try {
    const token: LoginCredentialsResponse = await LoginUser(credentials)
    localStorage.setItem('access', token.access)
    localStorage.setItem('refresh', token.refresh)
    router.push({name: 'Dashboard'})
  } catch (error) {
    errors.value = error.response.data.non_field_errors
  }
}
</script>
