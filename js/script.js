$(() => {
    const $tabs = $(".keyboards > .tabs")
    const $contents = $(".keyboards > .contents")
    const $type = $(".keyboards > .info > .type .text")

    keyboard.type.map((type) => {
        $tabs.append(`<button class="tab" type="${type.name}">${keyboard.icons[type.icon]}</button>`)
        $contents.append(`<div class="keyboard ${type.name}""></div>`)

        keyboard[type.name].map((key) => {
            const size = key.size.toString().split(".").join("")
            const keyCode = key.keyCode
            const location = key.location
            var name = key.key
            margin = ver = ""

            if (key.icon) {
                icon = key.icon.split("|")
                if (icon.length == 2) {
                    name = keyboard.icons[icon[0]][icon[1]]
                } else if (icon.length == 1) {
                    name = keyboard.icons[key.icon]
                }
            }

            if (((keyCode == 107 || (keyCode == 13 && key.location == 3)) && type.name == "windows") || (keyCode == 13 && type.name == "mac" && key.location == 3)) ver = "-ver"
            if (key.right !== 0) margin = ` mr-${key.right.toString().split(".").join("")}u`
            if (keyCode == 91 && type.name == "windows") name = keyboard.icons[type.name]

            $contents.find(`.keyboard.${type.name}`).append(`<div class="keycaps key-${keyCode}-${location} s-${size}u${ver}${margin}"><p>${name}</p></div>`)
        })
    })
    $tabs.find(".tab:first").addClass("active")
    $contents.find(".keyboard:first").addClass("active")

    $tabs.on("click", ".tab", (e) => {
        const $tab = $(e.currentTarget)
        $tabs.find(".tab").removeClass("active")
        $tab.addClass("active")
        $contents.find(".keyboard").removeClass("active")
        $contents.find(`.keyboard.${$tab.attr("type")}`).addClass("active")
        $type.html($tab.attr("type"))
    })

    $(document).on("keydown", (event) => {
        event.preventDefault()
        const key = event.keyCode
        const location = event.originalEvent.location
        const $active = $contents.find(".active")
        $active.find(".key-" + key + "-" + location).removeClass("active")
        $active.find(".key-" + key + "-" + location).addClass("press")
    })
    $(document).on("keyup press", (event) => {
        event.preventDefault()
        const key = event.keyCode
        const location = event.originalEvent.location
        const $active = $contents.find(".active")
        $active.find(".key-" + key + "-" + location).removeClass("press")
        $active.find(".key-" + key + "-" + location).addClass("active")
    })
    $(document).on("mousedown", (event) => {
        event.preventDefault()
        const key = event.button
        const $active = $contents.find(".active")
        $active.find(".key-m-" + key + "-0").removeClass("active")
        $active.find(".key-m-" + key + "-0").addClass("press")
    })
    $(document).on("mouseup", (event) => {
        event.preventDefault()
        const key = event.button
        const $active = $contents.find(".active")
        $active.find(".key-m-" + key + "-0").removeClass("press")
        $active.find(".key-m-" + key + "-0").addClass("active")
    })
    $(document).bind("contextmenu", () => {
        return false
    })
})