<script>
    import {contactCreate} from "$lib/api/ContactApi.js";
    import {alertError, alertSuccess} from "$lib/alert.js";
    import {goto} from "$app/navigation";
    import ContactForm from "$lib/components/ContactForm.svelte";

    const token = localStorage.getItem('token');
    const contact = $state({
        first_name: "",
        last_name: "",
        email: "",
        phone: ""
    });

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await contactCreate(token, contact);
        const responseBody = await response.json();
        console.log(responseBody);

        if (response.status === 200) {
            await alertSuccess('contact created successfully');
            await goto('/dashboard/contacts');
        } else {
            await alertError(responseBody.errors);
        }
    }
</script>

<div class="flex items-center mb-6">
    <a href="/dashboard/contacts" class="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200">
        <i class="fas fa-arrow-left mr-2"></i> Back to Contacts
    </a>
    <h1 class="text-2xl font-bold text-white flex items-center">
        <i class="fas fa-user-plus text-blue-400 mr-3"></i> Create New Contact
    </h1>
</div>

<div class="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
    <div class="p-8">
        <form onsubmit={handleSubmit}>
            <ContactForm {contact}/>

            <div class="flex justify-end space-x-4">
                <a href="/dashboard/contacts"
                   class="px-5 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center shadow-md">
                    <i class="fas fa-times mr-2"></i> Cancel
                </a>
                <button type="submit"
                        class="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center">
                    <i class="fas fa-plus-circle mr-2"></i> Create Contact
                </button>
            </div>
        </form>
    </div>
</div>