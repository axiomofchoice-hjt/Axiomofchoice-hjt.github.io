---
title: Codeforces Round 720 (Div. 2) 题解 (ABCD)
date: 2021-05-08 09:05:00
permalink: /pages/dc0342/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

[[toc]]

[传送门](https://codeforces.com/contest/1521)

## A. Nastia and nearly Good Numbers

大意：求互不相同的三个正整数 $x,y,z$ 满足其中一个被 $AB$ 整除，另外两个数不被 $AB$ 整除但是被 $A$ 整除。

显然 $B=1$ 的时候，又被 $A$ 整除又不被 $A$ 整除是不可能的。因此这种情况输出 NO。

对于其他情况，只要构造 $A,A(B^2-1),AB^2$ 即可（答案应该挺多，我随便构造了一个）。

```cpp
#include <bits/stdc++.h>
#define repeat(i,a,b) for(int i=(a),ib=(b);i<ib;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,ib=(a);i>=ib;i--)
using namespace std;
typedef long long ll;
ll read(){ll x; if(scanf("%lld",&x)!=1)exit(0); return x;}
void print(ll x,bool e=0){printf("%lld%c",x," \n"[e]);}
const int N=200010;
void Solve(){
    ll a=read(),b=read();
    if(b==1)puts("NO");
    else puts("YES"),print(a),print(a*b*b-a),print(a*b*b,1);
}
signed main(){
    // freopen("data.txt","r",stdin);
    int T=1; T=read();
    repeat(ca,1,T+1){
        Solve();
    }
    return 0;
}
```

## B. Nastia and a Good Array

大意：可以进行最多 $n$ 次某种操作，最后要求数列的所有相邻数字互质。

如果数列有两个数 $3,9$，保持 $3$ 不动，$9$ 可以变成 $\ge 3$ 的任何数字。归纳地说，取最小值的位置和另外一个位置，保持最小值位置上的数字不变，另外一个位置可以修改成不小于最小值的任何数。

因此策略就很简单了，先找到最小值 $a_t$。如果它在奇数位，就把奇数位的所有数修改成 $a_t$，并把偶数位的所有数修改成 $a_t+1$（相差为 1 的两个数一定互质，$\gcd(a_t,a_t+1)=1$）。如果它在偶数位，那么奇偶反过来就行了。

```cpp
#include <bits/stdc++.h>
#define repeat(i,a,b) for(int i=(a),ib=(b);i<ib;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,ib=(a);i>=ib;i--)
using namespace std;
typedef long long ll;
ll read(){ll x; if(scanf("%lld",&x)!=1)exit(0); return x;}
void print(ll x,bool e=0){printf("%lld%c",x," \n"[e]);}
const int N=200010;
int a[N];
void Solve(){
    int n=read();
    repeat(i,0,n)a[i]=read();
    int p=min_element(a,a+n)-a;
    print(n-1,1);
    repeat(i,0,n)if(i!=p){
        if(i%2==p%2){
            printf("%d %d %d %d\n",i+1,p+1,a[p],a[p]);
        }
        else{
            printf("%d %d %d %d\n",i+1,p+1,a[p]+1,a[p]);
        }
    }
}
signed main(){
    // freopen("data.txt","r",stdin);
    int T=1; T=read();
    repeat(ca,1,T+1){
        Solve();
    }
    return 0;
}
```

## C. Nastia and a Hidden Permutation

大意：交互题，有个隐藏的排列，每次询问两个位置上的数的情况，最后求出排列。

一个比较容易想的策略是，先找到 1，然后一个个求出剩下的。

如果询问 $t=2,x=1$，回答就是 $\min(\max(1,p_i),\max(2,p_j))$。如果回答 $\le 2$，可以断言 $p_i,p_j$ 里面必然有 1 或 2。如果是 $1$，那就有 $p_i=1$；否则 $i,j$ 交换再询问，如果回答是 $1$，那么 $p_j=1$。

到这里，我们找到 1 的位置 $pos[1]$。接下来只要询问 $t=1,j=pos[1],x=n-1$，所得到的值就是 $p_i$。

```cpp
#include <bits/stdc++.h>
#define repeat(i,a,b) for(int i=(a),ib=(b);i<ib;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,ib=(a);i>=ib;i--)
using namespace std;
typedef long long ll;
ll read(){ll x; if(scanf("%lld",&x)!=1)exit(0); return x;}
void print(ll x,bool e=0){printf("%lld%c",x," \n"[e]);}
const int N=200010;
int query(int t,int i,int j,int x){
    printf("? %d %d %d %d\n",t,i,j,x);
    fflush(stdout);
    return read();
}
int p,ans[N];
void find1(int x,int y){
    int t=query(2,x,y,1);
    if(t==1)p=x;
    else if(t==2){
        if(query(2,y,x,1)==1)
            p=y;
    }
}
void Solve(){
    int n=read();
    for(int i=1;i<=n;i+=2){
        find1(i,i%n+1);
    }
    repeat(i,1,n+1)if(i!=p){
        ans[i]=query(1,p,i,n-1);
    }
    ans[p]=1;
    printf("!");
    repeat(i,1,n+1)printf(" %d",ans[i]);
    puts("");
    fflush(stdout);
}
signed main(){
    // freopen("data.txt","r",stdin);
    int T=1; T=read();
    repeat(ca,1,T+1){
        Solve();
    }
    return 0;
}
```

## D. Nastia Plays with a Tree

大意：删 k 条边并连 k 条边让给定树变成链。求 k 最小值及方案。

假如反过来，从没有边的图开始，不断加边，使得所有点的度 $\le 2$，加不了的边就当做删除了。这样可以得到一条条链（肯定无环因为原图是树），最后按任意顺序连接这些链就行了。

但是但是，如果按任意顺序加边，并不是最优的。比如 1-3,2-3,3-4,4-5,4-6。如果先加了边 3-4，那么会被迫删除两条边，反之只要删除 3-4 这一条边即可。

我根据这个数据大致猜到了正确（？）的加边顺序，即，用拓扑排序的方法，不断删除度为 1 的节点，加边顺序就是该节点对应的那条边。

代码：（比赛时改来改去最后代码极度混乱，慎点！）

<https://pasteme.cn/121793>
