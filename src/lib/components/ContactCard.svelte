<script>
    const {contact} = $props();
</script>

<a href="/dashboard/contacts/{contact.id}" class="block cursor-pointer hover:bg-gray-700 rounded-lg transition-all duration-200 p-3">
    <div class="flex items-center mb-3">
        <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-md">
            <i class="fas fa-user text-white"></i>
        </div>
        <h2 class="text-xl font-semibold text-white hover:text-blue-300 transition-colors duration-200">{contact.first_name} {contact.last_name}</h2>
    </div>
    <div class="space-y-3 text-gray-300 ml-2">
        <p class="flex items-center">
            <i class="fas fa-user-tag text-gray-500 w-6"></i>
            <span class="font-medium w-24">First Name:</span>
            <span>{contact.first_name}</span>
        </p>
        <p class="flex items-center">
            <i class="fas fa-user-tag text-gray-500 w-6"></i>
            <span class="font-medium w-24">Last Name:</span>
            <span>{contact.last_name}</span>
        </p>
        <p class="flex items-center">
            <i class="fas fa-envelope text-gray-500 w-6"></i>
            <span class="font-medium w-24">Email:</span>
            <span>{contact.email}</span>
        </p>
        <p class="flex items-center">
            <i class="fas fa-phone text-gray-500 w-6"></i>
            <span class="font-medium w-24">Phone:</span>
            <span>{contact.phone}</span>
        </p>
    </div>
</a>

