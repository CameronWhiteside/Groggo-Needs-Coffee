const Lorem = ({ chars }) => {
    const text = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent semper feugiat nibh sed pulvinar proin gravida. Habitant morbi tristique senectus et netus et malesuada. Venenatis cras sed felis eget. Massa vitae tortor condimentum lacinia quis. Pellentesque dignissim enim sit amet venenatis. Pellentesque massa placerat duis ultricies lacus sed turpis tincidunt. Ornare lectus sit amet est placerat in egestas erat imperdiet. Bibendum enim facilisis gravida neque convallis a. Est lorem ipsum dolor sit amet consectetur. Condimentum vitae sapien pellentesque habitant morbi tristique. Non enim praesent elementum facilisis leo vel. Nunc id cursus metus aliquam eleifend mi in. Ut morbi tincidunt augue interdum velit. Eget duis at tellus at urna condimentum mattis pellentesque. Venenatis a condimentum vitae sapien pellentesque habitant morbi.

    Euismod quis viverra nibh cras pulvinar mattis. Tellus in metus vulputate eu scelerisque felis. Consectetur adipiscing elit ut aliquam purus sit amet luctus venenatis. Id cursus metus aliquam eleifend mi in. Sit amet consectetur adipiscing elit duis tristique sollicitudin. Risus sed vulputate odio ut. Sit amet est placerat in egestas erat imperdiet. Nullam ac tortor vitae purus faucibus ornare suspendisse sed. Et malesuada fames ac turpis egestas integer eget aliquet. Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit. Nisi lacus sed viverra tellus in hac. Nec ultrices dui sapien eget mi. Quam pellentesque nec nam aliquam sem et tortor consequat id. A scelerisque purus semper eget duis at tellus. Luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor.

    Diam sit amet nisl suscipit adipiscing bibendum. Semper eget duis at tellus at urna condimentum. Cum sociis natoque penatibus et magnis dis. Augue neque gravida in fermentum. Faucibus a pellentesque sit amet. Senectus et netus et malesuada fames. Sit amet massa vitae tortor. Duis ut diam quam nulla porttitor. Sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae. Viverra adipiscing at in tellus integer feugiat scelerisque varius.

    Feugiat pretium nibh ipsum consequat nisl vel. Sagittis eu volutpat odio facilisis mauris sit amet. Blandit libero volutpat sed cras ornare. Ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida. Pellentesque elit eget gravida cum. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Laoreet id donec ultrices tincidunt arcu non sodales. Est sit amet facilisis magna etiam tempor orci eu. Phasellus vestibulum lorem sed risus ultricies tristique nulla. Diam vulputate ut pharetra sit amet. Volutpat sed cras ornare arcu dui vivamus. Massa massa ultricies mi quis hendrerit dolor magna eget est. A cras semper auctor neque. Feugiat vivamus at augue eget. Faucibus nisl tincidunt eget nullam non nisi est. Integer enim neque volutpat ac tincidunt. Nisi quis eleifend quam adipiscing vitae. Gravida dictum fusce ut placerat.

    Ut faucibus pulvinar elementum integer enim neque volutpat ac. Lectus quam id leo in. Ut morbi tincidunt augue interdum velit euismod in pellentesque. Id venenatis a condimentum vitae sapien. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus. Sit amet consectetur adipiscing elit. Ut morbi tincidunt augue interdum velit. Ut morbi tincidunt augue interdum velit euismod in. Condimentum mattis pellentesque id nibh tortor id aliquet lectus. Sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum. Faucibus nisl tincidunt eget nullam. Tristique senectus et netus et. Tellus in hac habitasse platea dictumst vestibulum rhoncus. Ligula ullamcorper malesuada proin libero nunc consequat interdum. Diam vel quam elementum pulvinar etiam non. Senectus et netus et malesuada fames ac. Nisl condimentum id venenatis a condimentum vitae sapien pellentesque habitant.

    `
    chars = parseInt(chars)

    return (
        <>
            {text.slice(0,chars)}
        </>
    )

}

export default Lorem
