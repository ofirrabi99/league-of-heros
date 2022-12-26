import styles from "../../styles/pages/article/[id].module.scss";

export default function Article() {
  return (
    <>
      <h1 className={`${styles.headerPrimary} ${styles.center}`}>
        Title of the article.
      </h1>
      <p className={`${styles.headerSecondary} ${styles.center}`}>
        Short description about the article, very interesting article. Short
        description about the article, very interesting article.
      </p>
      <div className="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in nibh
        elementum, pretium arcu in, aliquam ipsum. Sed consequat ex nec auctor
        sagittis. Nullam eu dui vitae neque accumsan blandit. Curabitur
        pellentesque quam vel quam tincidunt, at iaculis tellus placerat.
        Suspendisse quis cursus augue. Ut imperdiet, lacus nec lobortis
        consectetur, quam mauris suscipit erat, id blandit nulla arcu at massa.
        Suspendisse vulputate erat porttitor auctor rhoncus. Quisque eleifend et
        ipsum ut iaculis. Fusce fringilla commodo tortor. Nullam ut hendrerit
        orci. Donec posuere maximus sapien, ac sodales nisi malesuada sed.
        Aenean dignissim ex in metus eleifend, eu tempus elit convallis. Cras
        tempor massa vel feugiat volutpat. Nam gravida gravida risus, vitae
        condimentum urna iaculis in. Curabitur ac massa vitae tortor tempor
        interdum. Quisque sed tellus ex. Pellentesque nec facilisis quam. Donec
        vulputate molestie nibh, eu finibus sapien iaculis in. Ut commodo
        scelerisque arcu quis cursus. Aenean ac dictum justo, quis interdum dui.
        Etiam a aliquet ligula. Nulla molestie nibh et faucibus imperdiet. Nunc
        sit amet urna sed ex consequat ullamcorper in a libero. Curabitur
        fringilla libero felis, id gravida magna consectetur sed. Integer
        molestie diam in lacus ornare iaculis in eu velit. Pellentesque viverra
        ultricies tortor eu fringilla. In hendrerit nunc non lectus cursus
        euismod. Nam imperdiet sollicitudin enim a elementum. Nulla ornare in
        nisi non fermentum. Quisque mattis nulla egestas dui fringilla semper.
        Proin id turpis nibh. Etiam ultrices justo auctor rutrum tincidunt.
        Aliquam tristique bibendum dolor in egestas. Vivamus accumsan facilisis
        leo. Morbi mattis urna nec lacus fermentum elementum. Morbi nisi dui,
        maximus quis porta ac, finibus sit amet quam. Sed luctus tellus elit,
        vel imperdiet mi aliquam non. Fusce vitae molestie nisi. Donec et augue
        imperdiet, ullamcorper purus a, scelerisque felis. Integer venenatis
        vitae elit sed tincidunt. Integer nulla lacus, posuere in consequat
        vitae, tempor ut quam. Nullam rhoncus dictum tortor eu faucibus. Quisque
        eu turpis dui. Donec molestie sapien at dui ornare, id lobortis velit
        dignissim. Aenean imperdiet at nibh sed facilisis. Duis eget bibendum
        dolor. Nam posuere eget nisl nec bibendum. Maecenas ac consectetur
        purus. Sed purus erat, lacinia vitae vehicula quis, blandit sed augue.
        Nullam id dapibus augue, non vehicula augue. Aenean dignissim ultricies
        tristique. Nulla posuere nulla interdum eros pharetra, eleifend
        venenatis turpis pellentesque. Cras non elit luctus, blandit odio ac,
        faucibus lorem. Fusce vel sollicitudin augue. Duis vel aliquet elit, et
        vehicula velit. Cras erat massa, blandit et quam fermentum, malesuada
        efficitur lacus. Integer varius nunc massa, nec sagittis lorem lacinia
        et. Donec non tempor urna. Donec auctor libero nibh, sed pretium quam
        consequat quis. Maecenas convallis orci vitae magna imperdiet, ut
        imperdiet sem gravida. Curabitur vulputate arcu ac orci malesuada, sed
        tristique velit fringilla. Suspendisse risus sapien, volutpat egestas
        sagittis vel, facilisis id justo. Nulla facilisi. Vestibulum egestas
        sapien sit amet interdum bibendum. Aliquam erat volutpat. Nunc hendrerit
        nisi iaculis tellus semper semper. Nullam nec augue vel nibh imperdiet
        sodales eu id velit.
      </div>
    </>
  );
}
