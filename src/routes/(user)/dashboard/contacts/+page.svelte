<script>
    import {onMount} from "svelte";
    import {contactDelete, contactList} from "$lib/api/ContactApi.js";
    import {alertConfirm, alertError, alertSuccess} from "$lib/alert.js";
    import ContactCard from "$lib/components/ContactCard.svelte";
    import PaginationCard from "$lib/components/PaginationCard.svelte";
    import SearchContact from "$lib/components/SearchContact.svelte";

    const token = localStorage.getItem('token');
    const search = $state({
        name: "",
        email: "",
        phone: "",
        page : 1
    });
    let totalPage = $state(0);
    let pages = $derived.by(() => {
        const data = [];
        for (let i = 1; i <= totalPage; i++) {
            data.push(i)
        }
        return data;
    });
    let contacts = $state([]);

    //delete contact
    async function handleDeleteContact(id) {
        if (!await alertConfirm('are you sure want to delete this contact')) {
            return;
        }

        const response = await contactDelete(token, id);
        const responseBody = await response.json();
        console.log(responseBody);

        if (response.status === 200) {
            await alertSuccess('success delete contact');
            //reload contact after delete
            await fetchContacts();
        } else {
            await alertError(responseBody.errors);
        }
    }

    async function handlePageChange(value) {
        search.page = value;
        await fetchContacts();
    }

    async function handleSearch(e) {
        e.preventDefault();
        search.page = 1;

        await fetchContacts();
    }

    async function fetchContacts() {
        const response = await contactList(token, search);
        const responseBody = await response.json();
        console.log(responseBody);

        if (response.status === 200) {
            contacts = responseBody.data;
            totalPage = responseBody.paging.total_page;
        } else {
            await alertError(responseBody.errors);
        }
    }

    function toggleSearchForm() {
        const toggleButton = document.getElementById('toggleSearchForm');
        const searchFormContent = document.getElementById('searchFormContent');
        const toggleIcon = document.getElementById('toggleSearchIcon');

        // Add transition for smooth animation
        searchFormContent.style.transition = 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, margin 0.3s ease-in-out';
        searchFormContent.style.overflow = 'hidden';
        searchFormContent.style.maxHeight = '0px';
        searchFormContent.style.opacity = '0';
        searchFormContent.style.marginTop = '0';

        toggleButton.addEventListener('click', function() {
            if (searchFormContent.style.maxHeight !== '0px') {
                // Hide the form
                searchFormContent.style.maxHeight = '0px';
                searchFormContent.style.opacity = '0';
                searchFormContent.style.marginTop = '0';
                toggleIcon.classList.remove('fa-chevron-up');
                toggleIcon.classList.add('fa-chevron-down');
            } else {
                // Show the form
                searchFormContent.style.maxHeight = searchFormContent.scrollHeight + 'px';
                searchFormContent.style.opacity = '1';
                searchFormContent.style.marginTop = '1rem';
                toggleIcon.classList.remove('fa-chevron-down');
                toggleIcon.classList.add('fa-chevron-up');
            }
        });
    }

    onMount(async ()=> {
        toggleSearchForm();
        await fetchContacts();
    })
</script>

<div class="flex items-center mb-6">
    <i class="fas fa-users text-blue-400 text-2xl mr-3"></i>
    <h1 class="text-2xl font-bold text-white">My Contacts</h1>
</div>

<!-- Search form -->
<SearchContact {search}{handleSearch}/>

<!-- Contact cards grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <!-- Create New Contact Card -->
    <div class="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom overflow-hidden border-2 border-dashed border-gray-700 card-hover animate-fade-in">
        <a href="/dashboard/contacts/create" class="block p-6 h-full">
            <div class="flex flex-col items-center justify-center h-full text-center">
                <div class="w-20 h-20 bg-gradient rounded-full flex items-center justify-center mb-5 shadow-lg transform transition-transform duration-300 hover:scale-110">
                    <i class="fas fa-user-plus text-3xl text-white"></i>
                </div>
                <h2 class="text-xl font-semibold text-white mb-3">Create New Contact</h2>
                <p class="text-gray-300">Add a new contact to your list</p>
            </div>
        </a>
    </div>
    {#each contacts as contact (contact.id)}
        <div class="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden card-hover animate-fade-in">
            <div class="p-6">
                <ContactCard {contact}/>
                <div class="mt-4 flex justify-end space-x-3">
                    <a href="/dashboard/contacts/{contact.id}/edit" class="px-4 py-2 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center">
                        <i class="fas fa-edit mr-2"></i> Edit
                    </a>
                    <button onclick={() => handleDeleteContact(contact.id)}
                            class="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center">
                        <i class="fas fa-trash-alt mr-2"></i> Delete
                    </button>
                </div>
            </div>
        </div>
    {/each}
</div>

<!-- Pagination -->
<PaginationCard {search}{pages}{totalPage}{handlePageChange}/>