<script>
    const {contact} = $props();
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
    <div>
        <label for="first_name" class="block text-gray-300 text-sm font-medium mb-2">First Name</label>
        <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-user-tag text-gray-500"></i>
            </div>
            <input type="text" id="first_name" name="first_name"
                   class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                   placeholder="Enter first name" required bind:value={contact.first_name}>
        </div>
    </div>
    <div>
        <label for="last_name" class="block text-gray-300 text-sm font-medium mb-2">Last Name</label>
        <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-user-tag text-gray-500"></i>
            </div>
            <input type="text" id="last_name" name="last_name"
                   class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                   placeholder="Enter last name" required bind:value={contact.last_name}>
        </div>
    </div>
</div>

<div class="mb-5">
    <label for="email" class="block text-gray-300 text-sm font-medium mb-2">Email</label>
    <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i class="fas fa-envelope text-gray-500"></i>
        </div>
        <input type="email" id="email" name="email"
               class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
               placeholder="Enter email address" required bind:value={contact.email}>
    </div>
</div>

<div class="mb-6">
    <label for="phone" class="block text-gray-300 text-sm font-medium mb-2">Phone</label>
    <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i class="fas fa-phone text-gray-500"></i>
        </div>
        <input type="tel" id="phone" name="phone"
               class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
               placeholder="Enter phone number" required bind:value={contact.phone}>
    </div>
</div>