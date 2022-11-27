
const root = document.querySelector('#root')
const tbody = document.querySelector('#tbody')

function Home () {
    root.innerHTML = `
        <header>
            <ul>
                <li onclick='Tools()'><a>Cadastrar Ferramenta</a></li>
                <li onclick='Technic()'><a>Cadastrar Técnico</a></li>
                <li onclick='Reserve()'><a>Controle de Ferramentas</a></li>
            </ul>
        </header>`
}

function Tools () {

    root.innerHTML = `
        <div class='notify' id="notify">Código de ferramenta existente</div>
        <form autocomplete="off" class="form" id='form_tool'>
            <a href="#" onclick='Home()'>Home</a>
            <label for="tool_id">Código da ferramenta
                <div class="id">
                    <input type="number" id="tool_id" required>
                    <button type="button">Gerar</button>
                </div>
            </label>
            <label for="tool_desc">Descrição da ferramenta
                <input type="text" id="tool_desc" required>
            </label>
            <label for="fabric">Fabricante
                <input type="text" id="fabric" required>
            </label>
            <label for="volts">Voltagem de uso
                <select id="volts" required>
                    <option value="-">-</option>
                    <option value="220">220</option>
                    <option value="110">110</option>
                </select>
            </label>
            <label for="measurement">Unidade de medida
                <select id="measurement">
                    <option value="cm">Centímetro(cm)</option>
                    <option value="dm">Decímetro(dm)</option>
                    <option value="mm">Milímetro(mm)</option>
                    <option value="in">Polegada(in)</option>
                </select>
            </label>
            <label for="tool_size">Tamanho
                <input type="text" id="tool_size" required>
            </label>
            <label for="tool_type">Tipo de ferramenta
                <input type="text" id="tool_type" required>
            </label>
            <label for="tool_material">Material da ferramenta
                <input type="text" id="tool_material" required>
            </label>
            <button type="submit">Cadastrar Ferramenta</button>
        </form>
        `

    const Form_Tool = document.querySelector('#form_tool')

    const tool_id = document.querySelector('#tool_id')
    const tool_desc = document.querySelector('#tool_desc')
    const fabric = document.querySelector('#fabric')
    const volts = document.querySelector('#volts')
    const measurement = document.querySelector('#measurement')
    const tool_size = document.querySelector('#tool_size')
    const tool_type = document.querySelector('#tool_type')
    const tool_material = document.querySelector('#tool_material')
    const generate = document.querySelector('.id button')

    function Reg_newTool (e) {
        e.preventDefault()

        var tool_Obj = {
            id: tool_id.value,
            desc: tool_desc.value,
            fabric: fabric.value,
            volts: volts.value,
            measure: measurement.value,
            size: tool_size.value,
            type: tool_type.value,
            material: tool_material.value,
            status: 'Liberado',
            finishTimeDate: false,
            timer: false
        }
        tool_Obj = JSON.stringify(tool_Obj)

        if (!localStorage.getItem(tool_id.value)) {
            localStorage.setItem(tool_id.value, tool_Obj)
            ipts_val('tools')
            notify(true, 'Ferramenta Cadastrada!')
            insert_Tools()
        } else {
            notify()
        }
    }

    generate.onclick = () => {
        var number = Math.round(Math.random() * 999)
        tool_id.value = number
    }

    Form_Tool.addEventListener('submit', Reg_newTool)

}

function Technic () {
    root.innerHTML = `
        <div class='notify' id="notify">CPF já existe</div>
        <form autocomplete="off" class="form" id='form_tec'>
            <a href="#" onclick='Home()'>Home</a>
            <label for="">CPF
                <input type="number" id="cpf" required min="11">
            </label>
            <label for="">Nome
                <input type="text" id="pessoa" required>
            </label>
            <label for="">Telefone de contato
                <input type="number" id="tel" required>
            </label>
            <label for="">Turno
                <input type="text" id="turno" required>
            </label>
            <label for="">Nome da equipe
                <input type="text" id="equipe_name" required>
            </label>
            <button type="submit">Cadastrar Técnico</button>
        </form>`

    const Form_Tec = document.querySelector('#form_tec')

    const cpf = document.querySelector('#cpf')
    const pessoa = document.querySelector('#pessoa')
    const tel = document.querySelector('#tel')
    const turno = document.querySelector('#turno')
    const equipe_name = document.querySelector('#equipe_name')

    function Reg_tec (e) {
        e.preventDefault()
        var tec_Obj = {
            cpf: cpf.value,
            name: pessoa.value,
            tel: tel.value,
            turno: turno.value,
            equipe: equipe_name.value,
        }
        tec_Obj = JSON.stringify(tec_Obj)

        if (!localStorage.getItem(cpf.value)) {
            localStorage.setItem(cpf.value, tec_Obj)
            ipts_val()
            notify(true, 'Técnico Cadastrado!')
            insert_Tools()
        } else {
            notify()
        }
    }
    Form_Tec.addEventListener('submit', Reg_tec)
}

function Reserve () {
    root.innerHTML = `
    <div class='notify' id="notify">Ferramenta indisponível!</div>
    
    <div class='form'>
        <h2>Reserve a Ferramenta</h2>
        <form autocomplete="off" id='form_reserve'>
            <a href="#" onclick='Home()'>Home</a>
            <label for="cpf_tec">CPF do Técnico
                <input type="number" id="cpf_tec" maxlength="11">
            </label>
            <label for="cd_tool">Código da Ferramenta
                <input type="number" id='cd_tool'>
            </label>
            <button type="submit">Reservar Ferramenta</button>
        </form>
        <h2>Libere a Ferramenta</h2>
        <form autocomplete="off" id='form_return'>
            <label for="cd_release">Código da Ferramenta 
                <input type="number" id='cd_release'>
            </label>
            <button type="submit">Liberar Ferramenta</button>
        </form>
        <h2>Remoção de Ferramenta</h2>
        <form autocomplete="off" id='form_remove'>
            <label for="cd_remove">Código da Ferramenta 
                <input type="number" id='cd_remove'>
            </label>
            <button type="submit">Remover Ferramenta</button>
        </form>
    </div>`
    const Form_Reserve = document.querySelector('#form_reserve')
    const Form_Return = document.querySelector('#form_return')
    const Form_Remove = document.querySelector('#form_remove')

    const cpf_tec = document.querySelector('#cpf_tec')
    const cd_tool = document.querySelector('#cd_tool')
    const cd_release = document.querySelector('#cd_release')
    const cd_remove = document.querySelector('#cd_remove')

    function Reserve_tool (e) {
        e.preventDefault()
        var date = new Date()
        date.setFullYear(date.getFullYear(), date.getMonth(), date.getDate() + 1)

        var tool_to_re = localStorage.getItem(cd_tool.value)
        tool_to_re = JSON.parse(tool_to_re)
        if (localStorage.getItem(cpf_tec.value) && localStorage.getItem(cd_tool.value) && tool_to_re.status === 'Liberado') {
            tool_to_re.status = cpf_tec.value
            tool_to_re.finishTimeDate = date
            tool_to_re.timer = false
            localStorage.setItem(cd_tool.value, JSON.stringify(tool_to_re))
            notify(true, 'Ferramenta Reservada!')
            insert_Tools()
            cpf_tec.value = ''
            cd_tool.value = ''
        } else if (!localStorage.getItem(cd_tool.value)) {
            notify(true, 'Ferramenta inexistente!')
        } else if (tool_to_re.status !== 'Liberado') {
            notify(true, 'Ferramenta em uso!')
        } else {
            notify(true, 'CPF inexistente!')
        }
    }

    function Release_tool (e) {
        e.preventDefault()
        var tool_to_re = localStorage.getItem(cd_release.value)
        tool_to_re = JSON.parse(tool_to_re)
        if (localStorage.getItem(cd_release.value) && tool_to_re.status !== 'Liberado') {
            tool_to_re.status = 'Liberado'
            tool_to_re.finishTimeDate = false
            tool_to_re.timer = false
            localStorage.setItem(cd_release.value, JSON.stringify(tool_to_re))
            cd_release.value = ''
            notify(true, 'Ferramenta Liberada!')
            insert_Tools()
        } else {
            notify(true, 'Ferramenta não existe ou ja está Liberada!')
        }
    }

    function Delete_tool (e) {
        e.preventDefault()
        var tool_to_re = localStorage.getItem(cd_remove.value)
        tool_to_re = JSON.parse(tool_to_re)
        if (tool_to_re) {
            var validate = confirm("Deseja realmente remover essa Ferramenta?")
            if (validate) {
                localStorage.removeItem(cd_remove.value)
                cd_remove.value = ''
                notify(true, 'Ferramenta removida!')
                insert_Tools()
            } else {
                notify(true, 'Ferramenta inexistente!')
            }
        }
    }

    Form_Return.addEventListener('submit', Release_tool)
    Form_Reserve.addEventListener('submit', Reserve_tool)
    Form_Remove.addEventListener('submit', Delete_tool)
}

const notify = (confirm, msg) => {
    var notifyDiv = document.getElementById('notify')
    if (!confirm) {
        notifyDiv.classList.toggle('appear')
        setTimeout(() => {
            notifyDiv.classList.toggle('appear')
        }, 2500);
    } else {
        notifyDiv.textContent = msg
        notifyDiv.classList.toggle('appear')
        setTimeout(() => {
            notifyDiv.classList.toggle('appear')
        }, 2500);
    }
}

const get_Local = () => {
    var list = []
    for (let i = 0; i < localStorage.length; i++) {
        var item = localStorage.getItem(localStorage.key(i))
        var itemParse = item.includes('{') ? JSON.parse(item) : item
        itemParse.id ? list.push(JSON.parse(item)) : ''
    }
    return list
}

function insert_Tools () {
    var tool_tr = get_Local().map(({ desc, size, id, material, volts, fabric, status, timer }) => {
        return (
            `<div class='tool-tr'>
                <h2>${ desc }</h2>
                <h2>${ size }</h2>
                <h2>${ id }</h2>
                <h2>${ material }</h2>
                <h2>${ volts }</h2>
                <h2>${ fabric }</h2>
                <h2 class='${ status !== 'Liberado' ? 'reserved' : '' }${ timer ? ' timed' : '' }'>${ status ?? 'Liberado' }</h2>
            </div>`
        )
    })
    tbody.innerHTML = tool_tr.join("")
}

const ipts_val = (param) => {
    if (param === 'tools') {
        tool_id.value = ''
        tool_desc.value = ''
        fabric.value = ''
        tool_size.value = ''
        tool_type.value = ''
        tool_material.value = ''
    } else {
        cpf.value = ''
        tel.value = ''
        pessoa.value = ''
        turno.value = ''
        equipe_name.value = ''
    }
}

const check_time = () => {
    var actualDate = new Date()
    console.log('checking');
    if (localStorage.length >= 0) {
        for (const tool in localStorage) {
            var toolStr = localStorage.getItem(tool)
            var parsed = JSON.parse(toolStr)

            if (parsed !== null) {
                if (parsed.finishTimeDate) {
                    var date = new Date(parsed.finishTimeDate)
                    if (actualDate.getDate() >= date.getDate()) {
                        if (actualDate.getHours() >= date.getHours()) {
                            if (actualDate.getMinutes() >= date.getMinutes()) {
                                parsed.finishTimeDate = false
                                parsed.timer = true
                                localStorage.setItem(tool, JSON.stringify(parsed))
                                insert_Tools()
                            }
                        }
                    }
                }
            }
        }
    }
}
setInterval(check_time, 30000)

window.onload = () => { Home(), insert_Tools() }