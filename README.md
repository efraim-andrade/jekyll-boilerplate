#Documentação do Jekyll

---

## Configurando o ambiente ( windows )

* Instalar o ruby 
    - https://rubyinstaller.org/

* Instalar o gem ( gerenciador de pacotes do ruby )
    - https://rubygems.org/pages/download

* Rodar no terminal
    - `$ gem install jekyll`
    - `$ bundle install ( equivaelente ao npm install )`


## Configurando o ambiente ( linux )

* Instalar ruby
    - `$ sudo apt-get install ruby ruby-dev build-essential`
    - echo '# Install Ruby Gems to ~/gems' >> ~/.bashrc
echo 'export GEM_HOME=$HOME/gems' >> ~/.bashrc
echo 'export PATH=$HOME/gems/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

* Instalar Jekyll
    - `$ gem install jekyll bundler`
---

## Iniciando um post

### Posts são feitos em markdown e ficam na pasta _posts, foi temos um script para facilitar o processod e criação

* Rodar na pasta do projeto
    - `$ ./initpost.sh -c nomeDoPost`

---

## Possiveis erros
* You have already activated sass 3.5.7, but your Gemfile requires sass 3.5.6. Prepending `bundle exec` to your command may solve this. (Gem::LoadError)
    - só rodar `$ bundle update sass` 