const apiHost = 'https://bigsale-fff6f-default-rtdb.firebaseio.com'
export default {
    async fetchData () {
        try {
            const response = await fetch(apiHost + '/deals.json')
            const data = await response.json()
            return Object.values(data)
        } catch (error) {
            console.log(error)
        }
    },

    async fetchDealDetail (id) {
        try {
            const response = await fetch(apiHost + '/deal-details/' + id + '.json')
            return await response.json()
        } catch (error) {
            console.log(error)
        }
    }
}