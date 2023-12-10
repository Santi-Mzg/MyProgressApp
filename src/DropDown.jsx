

export default function Dropdown( {onClick} ) {

    return (
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle show" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="true">Dropdown</a>
            <div class="dropdown-menu show" style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate3d(0px, 42.4px, 0px);" data-popper-placement="bottom-start">
                <a class="dropdown-item" href="#" onClick={onClick}>Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Separated link</a>
            </div>
        </li>
    )
}
