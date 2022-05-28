<template>
  <b-container id="about" class="content-bg">
    <div class="title d-flex justify-content-between align-items-center">
      <h2 v-text="'Cadre du projet'" />
      <font-awesome-icon class="text-primary" icon="project-diagram" size="lg" />
    </div>
    <p v-html="`Ce prototype est réalisé dans le cadre du cours <b>Valorisation des Données</b> du <i>Master in Science in Business Administration</i> (MScBA), orientation Management des Systèmes d'Information de la HES-SO de Lausanne.`" />
    <p v-html="`Il ne constitue qu'une partie du projet, avec le rapport fourni à l'issue de celui-ci, ainsi qu'une présentation de nos résultats sous forme de PowerPoint.`" />
    <p v-html="`Il a été réalisé par groupe de 5 étudiants avec des backgrounds différents (économie / informatique), sous la supervision d'un professeur de la HES-SO. Afin de coller aux besoins du métier, des acteurs du tourisme suisse ont été sollicités.`" />
    <div class="title d-flex justify-content-between align-items-center">
      <h2 v-text="'Objectifs'" />
      <font-awesome-icon class="text-primary" icon="bullseye" size="lg" />
    </div>
    <p v-html="`L'objectif premier du projet est d'imaginer et de mettre en oeuvre un service innovant, en reprenant les éléments théoriques appris en cours.`" />
    <p v-html="`Dans notre cas de figure, nous avons décidé de travailler sur les données <i>Heatmap</i> et <i>Origine / Destination</i> du <i>Swisscom Digital Marketplace</i>. Nous avons choisi de nous orienter sur ces sets de données en particulier au contact de l'<b>Observatoire Valaisan du Tourisme</b>, qui est demandeur de ce type de visualisations dans le cadre de ses mandats auprès de partenaires touristiques.`" />
    <div class="title d-flex justify-content-between align-items-center">
      <h2 v-text="'Données utilisées'" />
      <font-awesome-icon class="text-primary" icon="database" size="lg" />
    </div>
    <p v-html="`Par le biais de l'<b>Observatoire Valaisan du Tourisme</b>, nous avons eu les plein accès aux offres Swisscom susmentionnées. De plus, nous avons eu l'opportunité de croiser ces données avec la data warehouse de l'Observatoire.`" />
      <p v-html="`Toutefois, ces deux sources de données n'étant malheureusement pas open-source, nous ne pouvons pas les partager autrement que via les informations disponibles sur la carte.`" />
    <div class="title d-flex justify-content-between align-items-center">
      <h2 v-text="'Équipe'" />
      <font-awesome-icon class="text-primary" icon="users" size="lg" />
    </div>
    <p>
      <span v-html="`<b class='text-primary'>Jordan Blanc</b>, économiste HES`" />
      <a href="https://www.linkedin.com/in/jordan-blanc-10636713a" target="_blank">
        <font-awesome-icon class="text-primary ml-2" :icon="['fab', 'linkedin']" size="lg" />
      </a>
    </p>
    <p>
      <span v-html="`<b class='text-primary'>Luna Rossier</b>, économiste HES`" />
      <a href="https://www.linkedin.com/in/luna-rossier-30112b14b" target="_blank">
        <font-awesome-icon class="text-primary ml-2" :icon="['fab', 'linkedin']" size="lg" />
      </a>
    </p>
    <p>
      <span v-html="`<b class='text-primary'>Pablo Vifian</b>, économiste HES`" />
    </p>
    <p>
      <span v-html="`<b class='text-primary'>Almin Salcinovic</b>, informaticien de gestion HES`" />
      <a href="https://www.linkedin.com/in/alminsalcinovic" target="_blank">
        <font-awesome-icon class="text-primary ml-2" :icon="['fab', 'linkedin']" size="lg" />
      </a>
    </p>
    <p>
      <span v-html="`<b class='text-primary'>Julien Reichenbach</b>, informaticien de gestion HES`" />
      <a href="https://www.linkedin.com/in/julien-reichenbach" target="_blank">
        <font-awesome-icon class="text-primary ml-2" :icon="['fab', 'linkedin']" size="lg" />
      </a>
    </p>
    <div class="title d-flex justify-content-between align-items-center">
      <h2 v-text="'Remerciements'" />
      <font-awesome-icon class="text-primary" icon="handshake" size="lg" />
    </div>
    <p v-html="`Nous remercions les professeurs <b>Alexandre Cotting</b> et <b>Jean-Paul Calbimonte</b> pour leurs feedbacks, leurs conseils et leur implication de le projet.`" />
    <p v-html="`Nous remercions <b>Pascal Favre</b> de l'Observatoire Valaisan du Tourisme pour son aide avec les services de Swisscom et ses suggestions.`" />
    <p v-html="`Nous remercions <b>Manu Broccard</b>, Professeur HES associé à la HES-SO de Sierre, de nous avoir accordé du temps en qualité d'organisateur de fesivals en Valais.`" />
    <p v-html="`Nous remercions <b>Dominique Fumeaux</b>, Responsable de la filière Tourisme à la HES-SO de Sierre, de nous avoir accordé du temps en qualité de responsable sécurité du Tour de Romandie.`" />
    <p v-html="`Nous remercions <b>Nicolas Vernaz</b>, Administrateur chez Red Consulting, de nous avoir accordé du temps en qualité d'expert en cybersécurité et en protection des données.`" />
    <div class="title d-flex justify-content-between align-items-center">
      <h2 v-text="'Ressources'" />
      <font-awesome-icon class="text-primary" :icon="['fab', 'github']" size="lg" />
    </div>
    <p v-html="`Lien vers le GitHub Repository <a class='font-weight-bold' href='https://github.com/julienreichenb/data-valorisation-g4' target='_blank'>ici</a>.`" />
  </b-container>
</template>

<script>
export default {
  name: 'About',
}
</script>

<style lang="scss">
#about {
  margin-bottom: 3em;

  .title {
    border-bottom: 1px solid theme-color('primary');
    margin-bottom: 2em;

    &:not(:first-child) {
      margin-top: 2em;
    }
  }
}
</style>