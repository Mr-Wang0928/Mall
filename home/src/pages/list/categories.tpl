{{#listCategories}}
    <li class="lsm-sidebar-item">
        <a href="javascript:;" data-categoryid={{_id}}><i class="my-icon lsm-sidebar-icon icon_1"></i><span>{{name}}</span><i class="my-icon iconfont icon-youjiantou"></i></a>
        <ul>
            {{# children0 }}
            <li class="lsm-sidebar-item">
                <a href="javascript:;" data-categoryid={{_id}} ><i class="my-icon lsm-sidebar-icon "></i><span>{{name}}</span><i class="my-icon iconfont icon-youjiantou"></i></a>
                <ul>
                    {{# children1 }}
                        <li class="lsm-sidebar-item">
                            <a href="javascript:;" data-categoryid={{_id}}><span>{{name}}</span></a>
                        </li>
                    {{/ children1 }}
                </ul>
            </li>
            {{/ children0 }}
        </ul>
    </li>
{{/listCategories}} 



