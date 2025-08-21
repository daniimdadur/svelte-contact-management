<script>
    import {page} from "$app/state";
    import {contactDetail} from "$lib/api/ContactApi.js";
    import {alertError, alertSuccess} from "$lib/alert.js";
    import {onMount} from "svelte";
    import {addressCreate} from "$lib/api/AddressApi.js";
    import {goto} from "$app/navigation";
    import AddressForm from "$lib/components/AddressForm.svelte";

    const token = localStorage.getItem('token');
    const {id} = page.params;
    let contact = $state({
        id: id,
        first_name: '',
        last_name: '',
        email: '',
        phone: ''
    });

    let address = $state({
        street: '',
        city: '',
        province: '',
        country: '',
        postal_code: ''
    });

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await addressCreate(token, id, address);
        const responseBody = await response.json();
        console.log(responseBody);

        if (response.status === 200) {
            await alertSuccess('create address success');
            await goto(`/dashboard/contacts/${id}`);
        } else {
            await alertError(responseBody.errors);
        }
    }

    async function fetchContact() {
        const response = await contactDetail(token, id);
        const responseBody = await response.json();
        console.log(responseBody);

        if (response.status === 200) {
            contact = responseBody.data;
        } else {
            await alertError(responseBody.errors);
        }
    }

    onMount(async ()=> {
        await fetchContact()
    });
</script>
<div class="flex items-center mb-6">
    <a href="/dashboard/contacts/{contact.id}" class="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200">
        <i class="fas fa-arrow-left mr-2"></i> Back to Contact Details
    </a>
    <h1 class="text-2xl font-bold text-white flex items-center">
        <i class="fas fa-plus-circle text-blue-400 mr-3"></i> Add New Address
    </h1>
</div>

<div class="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
    <div class="p-8">
        <!-- Contact Information -->
        <div class="mb-6 pb-6 border-b border-gray-700">
            <div class="flex items-center">
                <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4 shadow-md">
                    <i class="fas fa-user text-white"></i>
                </div>
                <div>
                    <h2 class="text-xl font-semibold text-white">{contact.first_name} {contact.last_name}</h2>
                    <p class="text-gray-300 text-sm">{contact.email} • {contact.phone}</p>
                </div>
            </div>
        </div>

        <form onsubmit={handleSubmit}>
            <AddressForm {address}/>

            <div class="flex justify-end space-x-4">
                <a href="/dashboard/contacts/{contact.id}"
                   class="px-5 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center shadow-md">
                    <i class="fas fa-times mr-2"></i> Cancel
                </a>
                <button type="submit"
                        class="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center">
                    <i class="fas fa-plus-circle mr-2"></i> Add Address
                </button>
            </div>
        </form>
    </div>
</div>