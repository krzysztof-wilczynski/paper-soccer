<template>
  <div class="q-pa-lg q-mx-md card" style="max-width: 600px">
    <q-form @submit.prevent.stop="onLogin"
            autofocus
            class="q-gutter-md">
      <q-input filled v-model="login" label="Login" lazy-rules
               ref="loginRef"
               :rules="stringRules">
        <template #prepend>
          <q-icon name="mdi-account"/>
        </template>
      </q-input>
      <q-input filled :type="isPassword ? 'password' : 'text'" v-model="password" label="Hasło"
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
import {LoginUser} from 'src/api/token'

const login = ref(null)
const password = ref(null)

const errors = ref([])
// const isValid = ref(false)
const isPassword = ref(true)

const router = useRouter()

const stringRules = [
  (val: string) => (!!val && val.length > 6) || 'Podaj hasło'
]

const onLogin = async () => {
  try {
    const {data} = await LoginUser(login.value, password.value)
    localStorage.setItem('token', data.token)
    await router.push({name: 'Dashboard'})
  } catch (error) {
    console.log(error)
    errors.value = error.response.data.non_field_errors
  }
}
</script>
