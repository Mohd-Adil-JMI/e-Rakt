const userDetails = document.querySelector(".user-details")
const userHistory = document.querySelector(".user-history")
const changePassword = document.querySelector(".user-password")

const deleteUser = document.querySelector('#v-pills-delete-tab')
const historyTab = document.querySelector('#v-pills-history-tab')
const profileTab = document.querySelector('#v-pills-profile-tab')
const changePasswordTab = document.querySelector('#v-pills-password-tab')
const logout = document.querySelector('#v-pills-logout-tab')

const editDetails = document.querySelector("#edit-details")
const inputValues = document.querySelectorAll(".value")
const updateBtn = document.querySelector('.update')

editDetails.addEventListener('click', () => {
    updateBtn.style.display = "inline-block"
    inputValues.forEach((input) => {
        input.removeAttribute("readonly")
        input.style.color = `rgb(83, 83, 83)`
    })
    inputValues[0].focus()
})

deleteUser.addEventListener('click', async () => {
    await fetch('/U_profile/users/me', { method: 'delete' })
    location.href = '/'
})
profileTab.addEventListener('click', () => {
    userDetails.style.display = "flex"
    userHistory.style.display = "none"
    changePassword.style.display = "none"
})
historyTab.addEventListener('click', () => {
    userDetails.style.display = "none"
    userHistory.style.display = "flex"
    changePassword.style.display = "none"
    console.log(historyTab)
})
changePasswordTab.addEventListener("click", () => {
    userDetails.style.display = "none"
    userHistory.style.display = "none"
    changePassword.style.display = "flex"
})
logout.addEventListener('click', () => {
    location.href = 'auth/Logout'
})